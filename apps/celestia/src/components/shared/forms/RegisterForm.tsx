import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, CustomInput, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useState, VFC } from 'react';
import { RootState } from 'src/store/rootReducer';
import { authActions } from 'src/store/slices';

import ExternalLink from 'src/components/shared/ExternalLink';
import BootstrapErrorMessages from 'src/components/shared/BootstrapErrorMessages';
import RevealPasswordButton from 'src/components/shared/RevealPasswordButton';
import InlineIcon from 'src/components/shared/InlineIcon';
import { registerThunk } from 'src/store/thunks';
import { combineErrors, validateEmail, validatePassword, validateRequired, validateUserName } from 'src/utils/forms';
import { Status, UnifiedErrorResponseTypes } from 'src/types/common';
import { PATHS } from 'src/paths';
import { AuthModalSide } from 'src/types/auth';
import { TFunction, Trans, useTranslation } from 'next-i18next';

enum INPUT_NAMES {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'new-password',
  PRIVACY = 'privacy_policy',
}

export const AcceptPrivacyPolicy: VFC<{ t: TFunction }> = ({ t }) => (
  <Trans t={t} i18nKey="common:auth.acceptPrivacyPolicy">
    0
    <ExternalLink href={PATHS.PRIVACY_POLICY} icon>
      1
    </ExternalLink>
  </Trans>
);

type FormFields = {
  [INPUT_NAMES.NAME]: string;
  [INPUT_NAMES.EMAIL]: string;
  [INPUT_NAMES.PASSWORD]: string;
  [INPUT_NAMES.PRIVACY]: boolean;
};

const RegisterForm: VFC = () => {
  const { t } = useTranslation();
  const { register: r, handleSubmit, errors: clientErrors, reset } = useForm<FormFields>({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { authModal, register } = useSelector((store: RootState) => store.auth);
  const [passwordRevealed, setPasswordRevealed] = useState(false);

  useEffect(() => {
    if (!authModal.open) {
      reset();
      setPasswordRevealed(false);
    }
  }, [reset, authModal.open]);

  const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
    dispatch(
      registerThunk({
        name: data[INPUT_NAMES.NAME],
        email: data[INPUT_NAMES.EMAIL],
        password: data[INPUT_NAMES.PASSWORD],
      })
    );
  };

  const isLoading = register.status === Status.LOAD;
  const errors = combineErrors(clientErrors, register.error);

  const requiredValidation = validateRequired(t);
  const emailValidation = validateEmail<FormFields>(t);
  const nameValidation = validateUserName<FormFields>(t);
  const passwordValidation = validatePassword(t);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center">
        <a href="#" onClick={() => dispatch(authActions.openAuthModal(AuthModalSide.SIGN_IN))}>
          {t('common:auth.alreadyHaveAccount')}
        </a>
      </p>

      <FormGroup>
        <Label htmlFor={INPUT_NAMES.NAME}>{t('common:auth.name')}</Label>
        <Input
          type="text"
          defaultValue=""
          name={INPUT_NAMES.NAME}
          innerRef={r({
            ...requiredValidation,
            ...nameValidation,
          })}
          maxLength={nameValidation.maxLength.value}
          invalid={INPUT_NAMES.NAME in errors}
          disabled={isLoading}
        />
        <FormText className="text-muted">
          {t('common:auth.nameHelp', {
            min: nameValidation.minLength.value,
            max: nameValidation.maxLength.value,
          })}
        </FormText>
        <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.NAME} />
      </FormGroup>

      <FormGroup row>
        <Label htmlFor={INPUT_NAMES.EMAIL} sm={12}>
          {t('common:auth.email')}
        </Label>
        <Col sm={12}>
          <Input
            type="email"
            defaultValue=""
            name={INPUT_NAMES.EMAIL}
            innerRef={r({
              ...requiredValidation,
              validate: emailValidation,
            })}
            invalid={INPUT_NAMES.EMAIL in errors}
            disabled={isLoading}
          />
          <FormText className="text-muted">{t('common:auth.emailHelp')}</FormText>
          <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.EMAIL} />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label htmlFor={INPUT_NAMES.PASSWORD} sm={12}>
          {t('common:auth.password')}
        </Label>
        <Col sm={12}>
          <InputGroup>
            <Input
              type={passwordRevealed ? 'text' : 'password'}
              defaultValue=""
              name={INPUT_NAMES.PASSWORD}
              innerRef={r({
                ...requiredValidation,
                ...passwordValidation,
              })}
              invalid={Boolean(errors[INPUT_NAMES.PASSWORD])}
              disabled={isLoading}
              autoComplete="off"
            />
            <InputGroupAddon addonType="append">
              <RevealPasswordButton passwordRevealed={passwordRevealed} setPasswordRevealed={setPasswordRevealed} />
            </InputGroupAddon>
          </InputGroup>
          <FormText className="text-muted">
            {t('common:auth.passwordHelp', {
              min: passwordValidation.minLength.value,
            })}
          </FormText>
          <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PASSWORD} />
        </Col>
      </FormGroup>

      <FormGroup>
        <CustomInput
          id={INPUT_NAMES.PRIVACY}
          name={INPUT_NAMES.PRIVACY}
          type="checkbox"
          label={<AcceptPrivacyPolicy t={t} />}
          invalid={INPUT_NAMES.PRIVACY in errors}
          disabled={isLoading}
          innerRef={r<HTMLInputElement>(validateRequired(t, 'acceptPrivacyPolicy'))}
        />
        <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PRIVACY} />
      </FormGroup>

      {register.error?.type === UnifiedErrorResponseTypes.MESSAGE_ONLY && <Alert color="danger">{register.error.message}</Alert>}

      {register.error?.type === UnifiedErrorResponseTypes.RATE_LIMITED && (
        <Alert color="danger">
          {t('common:auth.rateLimited', {
            count: register.error.retryAfter,
          })}
        </Alert>
      )}

      <Button color="ui" disabled={isLoading}>
        <InlineIcon first loading={isLoading} icon="user-plus" />
        {t('common:auth.registerButton')}
      </Button>
    </Form>
  );
};

export default RegisterForm;
