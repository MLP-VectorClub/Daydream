import { Button, Tooltip } from 'reactstrap';
import { useSelector } from 'react-redux';
import { FC, useState } from 'react';
import { Status } from 'src/types';
import { RootState, useAppDispatch } from 'src/store';
import InlineIcon from 'src/components/shared/InlineIcon';
import { signOutThunk } from 'src/store/thunks';
import { useTranslation } from 'next-i18next';

const BUTTON_ID = 'signout';

const SignOutButton: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { signOut } = useSelector((state: RootState) => state.auth);
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const handleSignOut = () => {
    void dispatch(signOutThunk());
    setSignOutConfirm(false);
  };

  return (
    <>
      <Button id={BUTTON_ID} onClick={() => setSignOutConfirm(true)} disabled={signOut.status === Status.LOAD}>
        <InlineIcon first icon="sign-out-alt" loading={signOut.status === Status.LOAD} />
        {t('common:sidebar.signOut')}
      </Button>
      <Tooltip isOpen={signOutConfirm} target={BUTTON_ID} container="sidebar" placement="bottom">
        <p className="mb-1">{t('common:sidebar.confirmSignOut')}</p>
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
