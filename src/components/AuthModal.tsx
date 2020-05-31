import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button, Col,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { MouseEventHandler, useEffect } from 'react';
import { Trans, useTranslation } from '../i18n';
import { RootState } from '../store/rootReducer';
import {
  AuthModalSide,
  FormSubmitHandler,
  PostUsersLoginRequest,
  PostUsersRequest,
  Status,
  UnifiedErrorResponseTypes,
} from '../types';
import { authActions, coreActions } from '../store/slices';
import ExternalLink from './shared/ExternalLink';
import ButtonIcon from './shared/ButtonIcon';
import { CSRF_COOKIE_NAME, PATHS } from '../config';
import BootstrapErrorMessages from './shared/BootstrapErrorMessages';
import {
  combineErrors,
  validateDisplayName,
  validateEmail,
  validatePassword, validateConfirmation,
  validateRequired,
} from '../utils';

enum INPUT_NAMES {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'password_confirmation',
  PRIVACY = 'privacy_policy',
}

export const AcceptPrivacyPolicy = (() => (
  <Trans ns="common" i18nKey="auth.acceptPrivacyPolicy">
    0<ExternalLink href={PATHS.PRIVACY_POLICY} icon />
  </Trans>
)) as React.FC;

type FormFields = PostUsersLoginRequest | (PostUsersRequest & {
  [INPUT_NAMES.PASSWORD_CONFIRM]: Pick<PostUsersLoginRequest, 'password'>;
  [INPUT_NAMES.PRIVACY]: boolean;
});

export default (() => {
  const { t } = useTranslation('common');
  const { register: r, handleSubmit, errors: clientErrors, reset, getValues, triggerValidation } = useForm<FormFields>({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { authModal, signIn, register } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (!document.cookie.includes(`${CSRF_COOKIE_NAME}=`)) {
      dispatch(coreActions.initCsrf());
    }
  }, []);

  useEffect(() => {
    if (!authModal.open) {
      reset();
    }
  }, [reset, authModal.open]);

  const onSubmit: FormSubmitHandler = data => {
    switch (authModal.side) {
      case AuthModalSide.SIGN_IN:
        dispatch(authActions.signIn(data as PostUsersLoginRequest));
        return;
      case AuthModalSide.REGISTER:
        dispatch(authActions.register(data as PostUsersRequest));
        return;
      default:
        throw new Error(`Unhandled auth modal side ${authModal.side}`);
    }
  };
  const switchSide = (currentSide: AuthModalSide): MouseEventHandler => e => {
    e.preventDefault();
    const newSide = currentSide === AuthModalSide.SIGN_IN
      ? AuthModalSide.REGISTER
      : AuthModalSide.SIGN_IN;
    dispatch(authActions.openAuthModal(newSide));
  };
  const toggle = () => dispatch((
    authModal.open
      ? authActions.closeAuthModal()
      : authActions.openAuthModal(null)
  ));

  const modalTitle = authModal.side === AuthModalSide.SIGN_IN ? 'auth.signInTitle' : 'auth.registerTitle';

  const sideState = authModal.side === AuthModalSide.SIGN_IN ? signIn : register;
  const isLoading = sideState.status === Status.LOAD;
  const errors = combineErrors(clientErrors, sideState.error);

  const requiredValidation = validateRequired(t);
  const emailValidation = validateEmail<FormFields>(t);
  const displayNameValidation = validateDisplayName<FormFields>(t);
  const passwordValidation = validatePassword(t);
  const passwordConfirmationValidation = validateConfirmation<FormFields>(
    t,
    getValues,
    INPUT_NAMES.PASSWORD,
  );

  const loginGroupProps = authModal.side === AuthModalSide.REGISTER
    ? {
      label: { sm: 12 },
      input: { sm: 12 },
      submitButton: {},
      submitButtonWrapper: {},
    }
    : {
      label: { className: 'text-right', sm: 4 },
      input: { sm: 8 },
      submitButton: { size: 'lg' },
      submitButtonWrapper: { className: 'text-center' },
    };

  return (
    <Modal centered isOpen={authModal.open} toggle={toggle} backdrop="static">
      <ModalHeader toggle={toggle}>{t(modalTitle)}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center">
            <a href="#" onClick={switchSide(authModal.side)}>
              {t(authModal.side === AuthModalSide.SIGN_IN ? 'auth.noAccountYet' : 'auth.alreadyHaveAccount')}
            </a>
          </p>

          {authModal.side === AuthModalSide.REGISTER && (
            <FormGroup>
              <Label htmlFor={INPUT_NAMES.NAME}>{t('auth.displayName')}</Label>
              <Input
                type="text"
                defaultValue=""
                name={INPUT_NAMES.NAME}
                innerRef={r({
                  ...requiredValidation,
                  ...displayNameValidation,
                })}
                maxLength={displayNameValidation.maxLength.value}
                invalid={INPUT_NAMES.NAME in errors}
                disabled={isLoading}
              />
              <FormText className="text-muted">
                {t('auth.displayNameHelp', {
                  min: displayNameValidation.minLength.value,
                  max: displayNameValidation.maxLength.value,
                })}
              </FormText>
              <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.NAME} />
            </FormGroup>
          )}

          <FormGroup row>
            <Label
              htmlFor={INPUT_NAMES.EMAIL}
              {...loginGroupProps.label}
            >
              {t('auth.email')}
            </Label>
            <Col {...loginGroupProps.input}>
              <Input
                type="text"
                defaultValue=""
                name={INPUT_NAMES.EMAIL}
                innerRef={r({
                  ...requiredValidation,
                  validate: emailValidation,
                })}
                invalid={INPUT_NAMES.EMAIL in errors}
                disabled={isLoading}
              />
              <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.EMAIL} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label
              htmlFor={INPUT_NAMES.PASSWORD}
              {...loginGroupProps.label}
            >
              {t('auth.password')}
            </Label>
            <Col {...loginGroupProps.input}>
              <Input
                type="password"
                defaultValue=""
                name={INPUT_NAMES.PASSWORD}
                innerRef={r({
                  ...requiredValidation,
                  ...passwordValidation,
                })}
                invalid={Boolean(errors[INPUT_NAMES.PASSWORD])}
                disabled={isLoading}
                onKeyUp={() => triggerValidation(INPUT_NAMES.PASSWORD_CONFIRM as never)}
              />
              {authModal.side === AuthModalSide.REGISTER && (
                <FormText className="text-muted">
                  {t('auth.passwordHelp', { min: passwordValidation.minLength.value })}
                </FormText>
              )}
              <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PASSWORD} />
            </Col>
          </FormGroup>

          {authModal.side === AuthModalSide.REGISTER && (
            <>
              <FormGroup>
                <Label htmlFor={INPUT_NAMES.PASSWORD_CONFIRM}>{t('auth.passwordConfirm')}</Label>
                <Input
                  type="password"
                  defaultValue=""
                  name={INPUT_NAMES.PASSWORD_CONFIRM}
                  innerRef={r({
                    ...requiredValidation,
                    ...passwordConfirmationValidation,
                  })}
                  invalid={INPUT_NAMES.PASSWORD_CONFIRM in errors}
                  disabled={isLoading}
                />
                <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PASSWORD_CONFIRM} />
              </FormGroup>

              <FormGroup>
                <CustomInput id={INPUT_NAMES.PRIVACY} name={INPUT_NAMES.PRIVACY} type="checkbox" label={<AcceptPrivacyPolicy />} invalid={INPUT_NAMES.PRIVACY in errors} disabled={isLoading} innerRef={r(validateRequired(t, 'acceptPrivacyPolicy'))} />
                <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PRIVACY} />
              </FormGroup>
            </>
          )}

          {sideState.error?.type === UnifiedErrorResponseTypes.AUTHENTICATION_ERROR && (
            <Alert color="danger">{t('auth.invalidCredentials')}</Alert>
          )}

          {sideState.error?.type === UnifiedErrorResponseTypes.MESSAGE_ONLY && (
            <Alert color="danger">{sideState.error.message}</Alert>
          )}

          <div {...loginGroupProps.submitButtonWrapper}>
            <Button {...loginGroupProps.submitButton} color="primary" disabled={isLoading}>
              <ButtonIcon
                loading={isLoading}
                icon={(
                  authModal.side === AuthModalSide.SIGN_IN
                    ? 'sign-in-alt'
                    : 'user-plus'
                )}
              />
              {
                t(authModal.side === AuthModalSide.SIGN_IN
                  ? 'auth.signInButton'
                  : 'auth.registerButton')
              }
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}) as React.FC;
