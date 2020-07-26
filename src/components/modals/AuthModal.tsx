import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import {
  MouseEventHandler,
  useEffect,
} from 'react';
import {
  Trans,
  useTranslation,
} from '../../i18n';
import { RootState } from '../../store/rootReducer';
import {
  AuthModalSide,
  PostUsersLoginRequest,
  PostUsersRequest,
} from '../../types';
import {
  authActions,
  coreActions,
} from '../../store/slices';
import ExternalLink from '../shared/ExternalLink';
import { PATHS } from '../../config';
import SignInForm from '../shared/forms/SignInForm';
import RegisterForm from '../shared/forms/RegisterForm';

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

type FormFields = PostUsersLoginRequest & PostUsersRequest & {
  [INPUT_NAMES.PASSWORD_CONFIRM]: Pick<PostUsersLoginRequest, 'password'>;
  [INPUT_NAMES.PRIVACY]: boolean;
};

export interface AuthModalFormProps {
  switchSide: (currentSide: AuthModalSide) => MouseEventHandler;
}

export default (() => {
  const { t } = useTranslation('common');
  const { reset } = useForm<FormFields>({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { authModal, signedIn } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    dispatch(coreActions.initCsrf());
  }, []);

  useEffect(() => {
    if (!authModal.open) {
      reset();
    }
  }, [reset, authModal.open]);

  if (signedIn) return null;

  const toggleModal = () => dispatch((
    authModal.open
      ? authActions.closeAuthModal()
      : authActions.openAuthModal(null)
  ));

  const modalTitle = authModal.side === AuthModalSide.SIGN_IN ? 'auth.signInTitle' : 'auth.registerTitle';

  const sides = {
    [AuthModalSide.SIGN_IN]: <SignInForm />,
    [AuthModalSide.REGISTER]: <RegisterForm />,
  };

  return (
    <Modal centered isOpen={authModal.open} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>{t(modalTitle)}</ModalHeader>
      <ModalBody>
        {sides[authModal.side]}
      </ModalBody>
    </Modal>
  );
}) as React.FC;
