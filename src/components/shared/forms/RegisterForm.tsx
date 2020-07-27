import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Alert,
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import {
  useEffect,
  useState,
} from 'react';
import {
  Trans,
  useTranslation,
} from '../../../i18n';
import { RootState } from '../../../store/rootReducer';
import {
  AuthModalSide,
  Status,
  UnifiedErrorResponseTypes,
  WithTFunction,
} from '../../../types';
import { authActions } from '../../../store/slices';
import ExternalLink from '../ExternalLink';
import InlineIcon from '../InlineIcon';
import { PATHS } from '../../../config';
import BootstrapErrorMessages from '../BootstrapErrorMessages';
import {
  combineErrors,
  validateEmail,
  validatePassword,
  validateRequired,
  validateUserName,
} from '../../../utils';
import RevealPasswordButton from '../RevealPasswordButton';

enum INPUT_NAMES {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'new-password',
  PRIVACY = 'privacy_policy',
}

export const AcceptPrivacyPolicy = (({ t }) => (
  <Trans t={t} i18nKey="auth.acceptPrivacyPolicy">
    0<ExternalLink href={PATHS.PRIVACY_POLICY} icon />
  </Trans>
)) as React.FC<WithTFunction>;

type FormFields = {
  [INPUT_NAMES.NAME]: string;
  [INPUT_NAMES.EMAIL]: string;
  [INPUT_NAMES.PASSWORD]: string;
  [INPUT_NAMES.PRIVACY]: boolean;
};

export default (() => {
  const { t } = useTranslation('common');
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

  const onSubmit: Parameters<typeof handleSubmit>[0] = data => {
    dispatch(authActions.register({
      name: data[INPUT_NAMES.NAME],
      email: data[INPUT_NAMES.EMAIL],
      password: data[INPUT_NAMES.PASSWORD],
    }));
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
          {t('auth.alreadyHaveAccount')}
        </a>
      </p>

      <FormGroup>
        <Label htmlFor={INPUT_NAMES.NAME}>{t('auth.name')}</Label>
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
          {t('auth.nameHelp', {
            min: nameValidation.minLength.value,
            max: nameValidation.maxLength.value,
          })}
        </FormText>
        <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.NAME} />
      </FormGroup>

      <FormGroup row>
        <Label
          htmlFor={INPUT_NAMES.EMAIL}
          sm={12}
        >
          {t('auth.email')}
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
          <FormText className="text-muted">
            <Trans t={t} i18nKey="auth.emailHelp">
              0
              <strong>1</strong>
            </Trans>
          </FormText>
          <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.EMAIL} />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label
          htmlFor={INPUT_NAMES.PASSWORD}
          sm={12}
        >
          {t('auth.password')}
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
              <RevealPasswordButton
                passwordRevealed={passwordRevealed}
                setPasswordRevealed={setPasswordRevealed}
              />
            </InputGroupAddon>
          </InputGroup>
          <FormText className="text-muted">
            {t('auth.passwordHelp', { min: passwordValidation.minLength.value })}
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
          innerRef={r(validateRequired(t, 'acceptPrivacyPolicy'))}
        />
        <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PRIVACY} />
      </FormGroup>

      {register.error?.type === UnifiedErrorResponseTypes.MESSAGE_ONLY && (
        <Alert color="danger">{register.error.message}</Alert>
      )}

      {register.error?.type === UnifiedErrorResponseTypes.RATE_LIMITED && (
        <Alert color="danger">
          {t('auth.rateLimited', { count: register.error.retryAfter })}
        </Alert>
      )}

      <Button color="ui" disabled={isLoading}>
        <InlineIcon first loading={isLoading} icon="user-plus" />
        {t('auth.registerButton')}
      </Button>
    </Form>
  );
}) as React.FC;
