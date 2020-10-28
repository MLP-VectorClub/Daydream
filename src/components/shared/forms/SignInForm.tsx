import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map } from 'lodash';
import { fromEvent } from 'rxjs';
import { queryCache } from 'react-query';
import { RootState } from 'src/store/rootReducer';
import {
  AuthModalSide,
  Nullable,
  SocialProvider,
  Status,
  UnifiedErrorResponseTypes,
} from 'src/types';
import { authActions } from 'src/store/slices';
import {
  combineErrors,
  ENDPOINTS,
  validateEmail,
  validatePassword,
  validateRequired,
  popupOpenCenter,
} from 'src/utils';
import { SOCIAL_PROVIDERS } from 'src/fancy-config';
import BootstrapErrorMessages from 'src/components/shared/BootstrapErrorMessages';
import RevealPasswordButton from 'src/components/shared/RevealPasswordButton';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';
import { signInThunk } from 'src/store/thunks';

enum INPUT_NAMES {
  EMAIL = 'email',
  PASSWORD = 'current-password',
  REMEMBER = 'remember',
}

type FormFields = {
  [INPUT_NAMES.EMAIL]: string;
  [INPUT_NAMES.PASSWORD]: string;
  [INPUT_NAMES.REMEMBER]: string;
};

interface SocialPopupRef {
  window: Nullable<Window | null>;
  timer: Nullable<ReturnType<typeof setInterval>>;
}

const SingInForm: React.FC = () => {
  const { register: r, handleSubmit, errors: clientErrors, reset } = useForm<FormFields>({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { authModal, signIn } = useSelector((store: RootState) => store.auth);
  const [passwordRevealed, setPasswordRevealed] = useState(false);
  const [rateLimitTimeout, setRateLimitTimeout] = useState<null | ReturnType<typeof setTimeout>>(null);
  const socialAuthPopup = useRef<SocialPopupRef>({ window: null, timer: null });

  useEffect(() => {
    if (!authModal.open) {
      reset();
      setPasswordRevealed(false);
    }
  }, [reset, authModal.open]);

  useEffect(() => {
    const clearRateLimitTimeout = () => {
      if (rateLimitTimeout) {
        clearTimeout(rateLimitTimeout);
        setRateLimitTimeout(null);
      }
    };

    if (signIn.error?.type !== UnifiedErrorResponseTypes.RATE_LIMITED) {
      clearRateLimitTimeout();
      return;
    }

    setRateLimitTimeout(setTimeout(clearRateLimitTimeout, signIn.error.retryAfter * 1e3));
  }, [rateLimitTimeout, signIn.error]);

  useEffect(() => {
    const subscription = fromEvent(window, 'beforeunload').subscribe(() => {
      if (socialAuthPopup.current.window) {
        socialAuthPopup.current.window.close();
      }
    });

    return () => {
      if (socialAuthPopup.current.timer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(socialAuthPopup.current.timer);
      }
      subscription.unsubscribe();
    };
  }, []);

  const signInWith = useCallback((provider: SocialProvider, popupTitle: string): MouseEventHandler => e => {
    e.preventDefault();

    socialAuthPopup.current.window = popupOpenCenter(
      ENDPOINTS.USERS_OAUTH_SIGNIN_PROVIDER({ provider }),
      popupTitle,
      screen.availWidth * 0.75,
      screen.availHeight * 0.75,
    );

    if (socialAuthPopup.current.timer !== null) {
      clearInterval(socialAuthPopup.current.timer);
    }
    socialAuthPopup.current.timer = setInterval(() => {
      const popup = socialAuthPopup.current.window;
      try {
        if (!popup || popup.closed) {
          if (socialAuthPopup.current.timer) {
            clearInterval(socialAuthPopup.current.timer);
            socialAuthPopup.current.timer = null;
          }
          void queryCache.invalidateQueries(ENDPOINTS.USERS_ME);
        }
      } catch (err) {
        /* ignore */
      }
    }, 500);
  }, []);

  const onSubmit: Parameters<typeof handleSubmit>[0] = useCallback(data => {
    dispatch(signInThunk({
      email: data[INPUT_NAMES.EMAIL],
      password: data[INPUT_NAMES.PASSWORD],
      remember: Boolean(data[INPUT_NAMES.REMEMBER]),
    }));
  }, [dispatch]);
  const isLoading = signIn.status === Status.LOAD;
  const errors = combineErrors(clientErrors, signIn.error);

  const requiredValidation = validateRequired();
  const emailValidation = validateEmail<FormFields>();
  const passwordValidation = validatePassword();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center">
        <a href="#" onClick={() => dispatch(authActions.openAuthModal(AuthModalSide.REGISTER))}>
          {common.auth.noAccountYet}
        </a>
      </p>

      <p className="text-center text-info">
        <FontAwesomeIcon icon="info" className="mr-2" />
        {common.auth.accountBenefits}
      </p>

      <FormGroup row>
        <Label htmlFor={INPUT_NAMES.EMAIL} className="text-right" sm={4}>
          {common.auth.email}
        </Label>
        <Col sm={8}>
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
          <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.EMAIL} />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label htmlFor={INPUT_NAMES.PASSWORD} className="text-right" sm={4}>
          {common.auth.password}
        </Label>
        <Col sm={8}>
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
              autocomplete="current-password"
            />
            <InputGroupAddon addonType="append">
              <RevealPasswordButton
                passwordRevealed={passwordRevealed}
                setPasswordRevealed={setPasswordRevealed}
              />
            </InputGroupAddon>
          </InputGroup>
          <BootstrapErrorMessages errors={errors} name={INPUT_NAMES.PASSWORD} />
        </Col>
      </FormGroup>

      <FormGroup>
        <CustomInput type="checkbox" name={INPUT_NAMES.REMEMBER} label={common.auth.rememberMe} id="remember-me" innerRef={r()} />
      </FormGroup>

      {signIn.error?.type === UnifiedErrorResponseTypes.AUTHENTICATION_ERROR && (
        <Alert color="danger">{common.auth.invalidCredentials}</Alert>
      )}

      {signIn.error?.type === UnifiedErrorResponseTypes.MESSAGE_ONLY && (
        <Alert color="danger">{signIn.error.message}</Alert>
      )}

      {signIn.error?.type === UnifiedErrorResponseTypes.RATE_LIMITED && (
        <Alert color="danger">
          {common.auth.rateLimited(signIn.error.retryAfter)}
        </Alert>
      )}

      <Row className="align-items-center">
        <Col>
          <Button color="ui" size="lg" disabled={isLoading || rateLimitTimeout !== null}>
            <InlineIcon first loading={isLoading} icon="sign-in-alt" />
            {common.auth.signInButton}
          </Button>
        </Col>
        <Col className="text-right">
          <Button type="button" color="link" id="forgot-pw" aria-readonly="true">
            {common.auth.forgotPassword}
          </Button>
          <UncontrolledTooltip target="forgot-pw" fade={false}>
            <InlineIcon icon="exclamation-triangle" color="warning" first />
            {common.auth.pwResetNotYetAvailable}
          </UncontrolledTooltip>
        </Col>
      </Row>

      <FormGroup tag="fieldset" className="text-center border-top mt-3 pt-3">
        <legend className="text-uppercase w-auto mx-auto px-2"><small>{common.auth.socialSignIn.alternatively}</small></legend>
        {map(SOCIAL_PROVIDERS, (settings, provider: SocialProvider) => {
          const text = common.auth.socialSignIn.signInWith(settings.name);
          return (
            <Button type="button" key={provider} color={provider} className="mx-2" onClick={signInWith(provider, text)}>
              {settings.renderIcon({ first: true })}
              {text}
            </Button>
          );
        })}
      </FormGroup>
    </Form>
  );
};

export default SingInForm;
