import { Button } from 'reactstrap';
import MainNavigation from 'src/components/shared/MainNavigation';
import SidebarUserInfo from 'src/components/shared/SidebarUserInfo';
import ExternalLink from 'src/components/shared/ExternalLink';
import { DISCORD_INVITE_LINK } from 'src/config';
import SidebarNotifications from 'src/components/shared/SidebarNotifications';
import HappeningSoon from 'src/components/widgets/HappeningSoon';
import SidebarUsefulLinks from 'src/components/shared/SidebarUsefulLinks';
import CustomIcon from 'src/components/shared/CustomIcon';
import SignInButton from 'src/components/shared/SignInButton';
import SignOutButton from 'src/components/shared/SignOutButton';
import { useAuth, useConnectionInfo } from 'src/hooks';
import { common } from 'src/strings';
import { VFC } from 'react';

const Sidebar: VFC = () => {
  const { signedIn } = useAuth();
  const { backendDown } = useConnectionInfo();

  return (
    <aside id="sidebar">
      <div className="mobile-nav d-block d-lg-none">
        <MainNavigation />
      </div>

      <SidebarUserInfo />

      {backendDown && (
        <section className="signin">
          <h2>{common.sidebar.welcome}</h2>
          <p>{common.sidebar.backendDown}</p>
        </section>
      )}
      {!backendDown && (
        <>
          {signedIn && <SidebarNotifications />}

          <section className={signedIn ? 'welcome' : 'signin'}>
            <SidebarUsefulLinks />
            <div className="mb-2">
              {signedIn
                ? <SignOutButton />
                : <SignInButton />}
            </div>
            <Button
              color="discord"
              size="sm"
              tag={ExternalLink}
              href={DISCORD_INVITE_LINK}
            >
              <CustomIcon src="/img/discord-logo-white.svg" className="mr-2" />
              {common.sidebar.joinDiscord}
            </Button>
          </section>
          {/* Widgets will go here */}
          <HappeningSoon />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
