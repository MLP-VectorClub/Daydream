import { useSelector } from 'react-redux';
import { Alert, Button, Col, CustomInput, Form, FormGroup, FormText, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { FC, useCallback, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from 'src/store';
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

export const AcceptPrivacyPolicy: FC<{ t: TFunction }> = ({ t }) => (
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

const RegisterForm: FC = () => {
  const { t } = useTranslation();
  const {
    register: r,
    handleSubmit,
    formState: { errors: clientErrors },
    reset,
  } = useForm<FormFields>({ criteriaMode: 'all' });
  const dispatch = useAppDispatch();
  const { authModal, register } = useSelector((store: RootState) => store.auth);
  const [passwordRevealed, setPasswordRevealed] = useState(false);

  useEffect(() => {
    if (!authModal.open) {
      reset();
      setPasswordRevealed(false);
    }
  }, [reset, authModal.open]);

  const onSubmit: Parameters<typeof handleSubmit>[0] = useCallback(
    (data) =>
      void dispatch(
        registerThunk({
          name: data[INPUT_NAMES.NAME],
          email: data[INPUT_NAMES.EMAIL],
          password: data[INPUT_NAMES.PASSWORD],
        })
      ),
    [dispatch]
  );

  const isLoading = register.status === Status.LOAD;
  const errors = combineErrors(clientErrors, register.error);

  const requiredValidation = validateRequired(t);
  const emailValidation = validateEmail<FormFields>(t);
  const nameValidation = validateUserName<FormFields>(t);
  const passwordValidation = validatePassword(t);

  const { ref: nameInputRef, ...nameInputRegister } = r(INPUT_NAMES.NAME, {
    ...requiredValidation,
    ...nameValidation,
  });
  const { ref: emailInputRef, ...emailInputRegister } = r(INPUT_NAMES.EMAIL, {
    ...requiredValidation,
    validate: emailValidation,
  });
  const { ref: passwordInputRef, ...passwordInputRegister } = r(INPUT_NAMES.PASSWORD, {
    ...requiredValidation,
    ...passwordValidation,
  });
  const { ref: acceptPrivacyPolicyRef, ...acceptPrivacyPolicyRegister } = r(
    INPUT_NAMES.PRIVACY,
    validateRequired(t, 'acceptPrivacyPolicy')
  );

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
          {...nameInputRegister}
          innerRef={nameInputRef}
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
            {...emailInputRegister}
            innerRef={emailInputRef}
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
              {...passwordInputRegister}
              innerRef={passwordInputRef}
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
          type="checkbox"
          label={<AcceptPrivacyPolicy t={t} />}
          invalid={INPUT_NAMES.PRIVACY in errors}
          disabled={isLoading}
          {...acceptPrivacyPolicyRegister}
          innerRef={acceptPrivacyPolicyRef}
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
