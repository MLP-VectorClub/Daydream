import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Tooltip,
} from 'reactstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useEffect } from 'react';
import {
  AuthModalSide,
  Status,
  WithTFunction,
} from '../../types';
import { RootState } from '../../store/rootReducer';
import { authActions } from '../../store/slices';
import LoadingRing from './LoadingRing';
import { isClientSide } from '../../utils';

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

export default (({ t }) => {
  const dispatch = useDispatch();
  const { authCheck } = useSelector((state: RootState) => state.auth);
  const { csrf } = useSelector((state: RootState) => state.core);

  const authLoading = authCheck.status !== Status.SUCCESS;
  const csrfLoading = csrf.status !== Status.SUCCESS;
  const openSignInModal = () => dispatch(authActions.openAuthModal(AuthModalSide.SIGN_IN));

  return (
    <>
      <Button id="signin" disabled={authLoading || csrfLoading} onClick={openSignInModal}>
        <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
        {t('sidebar.signIn')}
      </Button>
      <Tooltip
        isOpen={isClientSide && (authLoading || csrfLoading)}
        target="signin"
        container="sidebar"
        placement="bottom"
      >
        {({ scheduleUpdate }) => (
          <TooltipContent
            scheduleUpdate={scheduleUpdate}
            text={t(csrfLoading ? 'sidebar.csrfInitializing' : 'sidebar.authInitializing')}
          />
        )}
      </Tooltip>
    </>
  );
}) as React.FC<WithTFunction>;
