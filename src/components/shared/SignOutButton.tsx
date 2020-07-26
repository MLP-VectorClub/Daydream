import {
  Button,
  Tooltip,
} from 'reactstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useState } from 'react';
import {
  Status,
  WithTFunction,
} from '../../types';
import ButtonIcon from './ButtonIcon';
import { RootState } from '../../store/rootReducer';
import { authActions } from '../../store/slices';

export default (({ t }) => {
  const dispatch = useDispatch();
  const { signOut } = useSelector((state: RootState) => state.auth);
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const handleSignOut = () => {
    dispatch(authActions.signOut());
    setSignOutConfirm(false);
  };

  return (
    <>
      <Button
        id="signout"
        onClick={() => setSignOutConfirm(true)}
        disabled={signOut.status === Status.LOAD}
      >
        <ButtonIcon first icon="sign-out-alt" loading={signOut.status === Status.LOAD} />
        {t('sidebar.signOut')}
      </Button>
      <Tooltip isOpen={signOutConfirm} target="signout" container="sidebar" placement="bottom">
        <p className="mb-1">{t('sidebar.confirmSignOut')}</p>
        <Button size="sm" color="success" onClick={handleSignOut} className="mr-2">
          <ButtonIcon icon="check" fixedWidth />
        </Button>
        <Button size="sm" color="danger" onClick={() => setSignOutConfirm(false)}>
          <ButtonIcon icon="times" fixedWidth />
        </Button>
      </Tooltip>
    </>
  );
}) as React.FC<WithTFunction>;
