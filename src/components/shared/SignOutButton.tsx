import { Button, Tooltip } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, VFC } from 'react';
import { Status } from 'src/types';
import { RootState } from 'src/store/rootReducer';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';
import { signOutThunk } from 'src/store/thunks';

const BUTTON_ID = 'signout';

const SignOutButton: VFC = () => {
  const dispatch = useDispatch();
  const { signOut } = useSelector((state: RootState) => state.auth);
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const handleSignOut = () => {
    dispatch(signOutThunk());
    setSignOutConfirm(false);
  };

  return (
    <>
      <Button
        id={BUTTON_ID}
        onClick={() => setSignOutConfirm(true)}
        disabled={signOut.status === Status.LOAD}
      >
        <InlineIcon first icon="sign-out-alt" loading={signOut.status === Status.LOAD} />
        {common.sidebar.signOut}
      </Button>
      <Tooltip isOpen={signOutConfirm} target={BUTTON_ID} container="sidebar" placement="bottom">
        <p className="mb-1">{common.sidebar.confirmSignOut}</p>
        <Button size="sm" color="success" onClick={handleSignOut} className="mr-2">
          <InlineIcon icon="check" fixedWidth />
        </Button>
        <Button size="sm" color="danger" onClick={() => setSignOutConfirm(false)}>
          <InlineIcon icon="times" fixedWidth />
        </Button>
      </Tooltip>
    </>
  );
};

export default SignOutButton;
