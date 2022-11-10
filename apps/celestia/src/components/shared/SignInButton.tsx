import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { AuthModalSide, Status } from 'src/types';
import { authActions } from 'src/store/slices';
import { useAuth, useCsrf } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';
import TooltipContent from 'src/components/shared/TooltipContent';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from 'src/store';

const BUTTON_ID = 'signin';

const SignInButton: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
        {t('common:sidebar.signIn')}
      </Button>
      {disabled && (
        <UncontrolledTooltip target={BUTTON_ID} container="sidebar" placement="bottom">
          {({ scheduleUpdate }) => (
            <TooltipContent scheduleUpdate={scheduleUpdate}>
              <LoadingRing inline spaceRight />
              {csrfLoading ? t('common:sidebar.csrfInitializing') : t('common:sidebar.authInitializing')}
            </TooltipContent>
          )}
        </UncontrolledTooltip>
      )}
    </>
  );
};

export default SignInButton;
