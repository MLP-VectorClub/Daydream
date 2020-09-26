import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useForm } from 'react-hook-form';
import React, { MouseEventHandler, useEffect } from 'react';
import { useTranslation } from 'src/i18n';
import { RootState } from 'src/store/rootReducer';
import { AuthModalSide, User } from 'src/types';
import { authActions } from 'src/store/slices';
import { useAuth } from 'src/hooks';
import SingInForm from 'src/components/shared/forms/SignInForm';
import RegisterForm from 'src/components/shared/forms/RegisterForm';

export interface AuthModalFormProps {
  switchSide: (currentSide: AuthModalSide) => MouseEventHandler;
}

const AuthModal: React.FC = () => {
  const { t } = useTranslation('common');
  const { reset } = useForm({ validateCriteriaMode: 'all' });
  const dispatch = useDispatch();
  const { signedIn, user } = useAuth();
  const { authModal } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (!authModal.open) {
      reset();
    }
  }, [reset, authModal.open]);

  useEffect(() => {
    if (signedIn && authModal.open) {
      dispatch(authActions.signInSuccess(user as User));
    }
  }, [signedIn]);

  if (signedIn) return null;

  const toggleModal = () => dispatch((
    authModal.open
      ? authActions.closeAuthModal()
      : authActions.openAuthModal(null)
  ));

  const modalTitle = authModal.side === AuthModalSide.SIGN_IN ? 'auth.signInTitle' : 'auth.signUpTitle';

  const sides = {
    [AuthModalSide.SIGN_IN]: <SingInForm />,
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
