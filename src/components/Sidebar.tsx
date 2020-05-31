import { ReactNode, ReactNodeArray, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Tooltip } from 'reactstrap';
import { useTranslation } from '../i18n';
import MainNavigation from './shared/MainNavigation';
import SidebarUserInfo from './shared/SidebarUserInfo';
import { RootState } from '../store/rootReducer';
import ExternalLink from './shared/ExternalLink';
import { DISCORD_INVITE_LINK } from '../config';
import SidebarNotifications from './shared/SidebarNotifications';
import HappeningSoon from './widgets/HappeningSoon';
import SidebarUsefulLinks from './shared/SidebarUsefulLinks';
import CustomIcon from './shared/CustomIcon';
import { authActions } from '../store/slices';
import { AuthModalSide, Status } from '../types';
import ButtonIcon from './shared/ButtonIcon';

export default (({ widgets }) => {
  const { t } = useTranslation('common');
  const { backendDown } = useSelector((state: RootState) => state.core);
  const { signedIn, signOut, authCheck } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const openSignInModal = () => dispatch(authActions.openAuthModal(AuthModalSide.SIGN_IN));
  const handleSignOut = () => {
    dispatch(authActions.signOut());
    setSignOutConfirm(false);
  };

  return (
    <aside id="sidebar">
      <div className="mobile-nav d-block d-lg-none">
        <MainNavigation />
      </div>

      <SidebarUserInfo />

      {backendDown && (
        <section className="login">
          <h2>{t('sidebar.welcome')}</h2>
          <p>{t('sidebar.backendDown')}</p>
        </section>
      )}
      {!backendDown && (
        <>
          {signedIn && <SidebarNotifications />}

          <section className={signedIn ? 'welcome' : 'login'}>
            <SidebarUsefulLinks />
            <ButtonGroup>
              {signedIn
                ? (
                  <>
                    <Button
                      id="signout"
                      onClick={() => setSignOutConfirm(true)}
                      disabled={signOut.status === Status.LOAD}
                    >
                      <ButtonIcon icon="sign-out-alt" loading={signOut.status === Status.LOAD} />
                      {t('sidebar.signOut')}
                    </Button>
                    <Tooltip isOpen={signOutConfirm} target="signout" container="sidebar" placement="bottom">
                      <p className="mb-1">{t('sidebar.confirmSignOut')}</p>
                      <Button size="sm" color="success" onClick={handleSignOut} className="mr-2">
                        <ButtonIcon icon="check" last fixedWidth />
                      </Button>
                      <Button size="sm" color="danger" onClick={() => setSignOutConfirm(false)}>
                        <ButtonIcon icon="times" last fixedWidth />
                      </Button>
                    </Tooltip>
                  </>
                )
                : (
                  <Button id="signin" disabled={authCheck.status === Status.LOAD} onClick={openSignInModal}>
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
                    {t('sidebar.signIn')}
                  </Button>
                )}
              <Button
                color="discord"
                tag={ExternalLink}
                href={DISCORD_INVITE_LINK}
              >
                <CustomIcon src="/img/discord-logo-white.svg" className="mr-2" />
                {t('sidebar.joinDiscord')}
              </Button>
            </ButtonGroup>
          </section>
          {widgets}
          <HappeningSoon />
        </>
      )}
    </aside>
  );
}) as React.FC<{ widgets: ReactNode | ReactNodeArray }>;
