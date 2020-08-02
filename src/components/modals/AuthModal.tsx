import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useForm } from 'react-hook-form';
import React, { MouseEventHandler, useEffect } from 'react';
import { useTranslation } from '../../i18n';
import { RootState } from '../../store/rootReducer';
import { AuthModalSide, PostUsersLoginRequest, PostUsersRequest } from '../../types';
import { authActions } from '../../store/slices';
import SignInForm from '../shared/forms/SignInForm';
import RegisterForm from '../shared/forms/RegisterForm';
import { useAuth } from '../../hooks';

enum INPUT_NAMES {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'password_confirmation',
  PRIVACY = 'privacy_policy',
}

type FormFields = PostUsersLoginRequest & PostUsersRequest & {
  [INPUT_NAMES.PASSWORD_CONFIRM]: Pick<PostUsersLoginRequest, 'password'>;
  [INPUT_NAMES.PRIVACY]: boolean;
};

export interface AuthModalFormProps {
  switchSide: (currentSide: AuthModalSide) => MouseEventHandler;
}

const AuthModal: React.FC = () => {
  const { t } = useTranslation('common');
  const { reset } = useForm<FormFields>({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { signedIn } = useAuth();
  const { authModal } = useSelector((store: RootState) => store.auth);

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
    // TODO Implement password reset form
    [AuthModalSide.PASSWORD_RESET]: null,
  };

  return (
    <Modal className="modal-ui" centered isOpen={authModal.open} toggle={toggleModal} backdrop="static">
      <ModalHeader toggle={toggleModal}>{t(modalTitle)}</ModalHeader>
      <ModalBody>
        {sides[authModal.side]}
      </ModalBody>
    </Modal>
  );
};

export default AuthModal;
