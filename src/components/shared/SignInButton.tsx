import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { useDispatch } from 'react-redux';
import React from 'react';
import { AuthModalSide, Status } from 'src/types';
import { authActions } from 'src/store/slices';
import { useAuth, useCsrf } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';
import { common } from 'src/strings';
import TooltipContent from 'src/components/shared/TooltipContent';

const BUTTON_ID = 'signin';

const SignInButton: React.FC = () => {
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
        {common.sidebar.signIn}
      </Button>
      {disabled && (
        <UncontrolledTooltip target={BUTTON_ID} container="sidebar" placement="bottom">
          {({ scheduleUpdate }) => (
            <TooltipContent scheduleUpdate={scheduleUpdate}>
              <LoadingRing inline spaceRight />
              {csrfLoading ? common.sidebar.csrfInitializing : common.sidebar.authInitializing}
            </TooltipContent>
          )}
        </UncontrolledTooltip>
      )}
    </>
  );
};

export default SignInButton;
