import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { AuthModalSide, Status, WithTFunction } from 'src/types';
import { authActions } from 'src/store/slices';
import { useAuth, useCsrf } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';

interface TooltipContentProps {
  scheduleUpdate: () => void;
  text: string;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ scheduleUpdate, text }) => {
  useEffect(() => {
    scheduleUpdate();
  }, [text]);

  return (
    <>
      <LoadingRing inline spaceRight />
      {text}
    </>
  );
};

const BUTTON_ID = 'signin';

const SignInButton: React.FC<WithTFunction> = ({ t }) => {
  const dispatch = useDispatch();
  const { authCheck } = useAuth();
  const csrf = useCsrf();

  const authLoading = authCheck.status === Status.LOAD;
  const csrfLoading = !csrf;
  const disabled = authLoading || csrfLoading;
  const openSignInModal = () => dispatch(authActions.openAuthModal(AuthModalSide.SIGN_IN));

  return (
    <>
      <Button id={BUTTON_ID} disabled={disabled} onClick={openSignInModal}>
        <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
        {t('sidebar.signIn')}
      </Button>
      {disabled && (
        <UncontrolledTooltip target={BUTTON_ID} container="sidebar" placement="bottom">
          {({ scheduleUpdate }) => (
            <TooltipContent
              scheduleUpdate={scheduleUpdate}
              text={t(csrfLoading ? 'sidebar.csrfInitializing' : 'sidebar.authInitializing')}
            />
          )}
        </UncontrolledTooltip>
      )}
    </>
  );
};

export default SignInButton;
