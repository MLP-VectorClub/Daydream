import { ReactNode, ReactNodeArray } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup } from 'reactstrap';
import MainNavigation from './shared/MainNavigation';
import SidebarUserInfo from './shared/SidebarUserInfo';
import { RootState } from '../store/rootReducer';
import ExternalLink from './shared/ExternalLink';
import { DISCORD_INVITE_LINK } from '../config';
import SidebarNotifications from './shared/SidebarNotifications';
import HappeningSoon from './widgets/HappeningSoon';
import SidebarUsefulLinks from './shared/SidebarUsefulLinks';
import CustomIcon from './shared/CustomIcon';

export default (({ widgets }) => {
  const { backendDown } = useSelector((state: RootState) => state.core);
  const { signedIn } = useSelector((state: RootState) => state.auth);
  return (
    <aside id="sidebar">
      <div className="mobile-nav d-block d-lg-none">
        <MainNavigation />
      </div>

      <SidebarUserInfo />

      {backendDown && (
        <section className="login">
          <h2>Welcome!</h2>
          <p>Signing in is not possible at the moment. Please check back later.</p>
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
                  <Button id="signout">
                    <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
                    Sign out
                  </Button>
                )
                : (
                  <Button color="deviantart" id="signin">
                    <FontAwesomeIcon icon={['fab', 'deviantart']} className="mr-2" />
                    Sign in
                  </Button>
                )}
              <Button
                color="discord"
                tag={ExternalLink}
                href={DISCORD_INVITE_LINK}
              >
                <CustomIcon src="/img/discord-logo-white.svg" className="mr-2" />
                Join Discord
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
