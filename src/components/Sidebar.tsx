import { Button, ButtonGroup } from 'reactstrap';
import { useTranslation } from '../i18n';
import MainNavigation from './shared/MainNavigation';
import SidebarUserInfo from './shared/SidebarUserInfo';
import ExternalLink from './shared/ExternalLink';
import { DISCORD_INVITE_LINK } from '../config';
import SidebarNotifications from './shared/SidebarNotifications';
import HappeningSoon from './widgets/HappeningSoon';
import SidebarUsefulLinks from './shared/SidebarUsefulLinks';
import CustomIcon from './shared/CustomIcon';
import SignInButton from './shared/SignInButton';
import SignOutButton from './shared/SignOutButton';
import { useAuth, useConnectionInfo } from '../hooks';

const Sidebar: React.FC = () => {
  const { t } = useTranslation('common');
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
          <h2>{t('sidebar.welcome')}</h2>
          <p>{t('sidebar.backendDown')}</p>
        </section>
      )}
      {!backendDown && (
        <>
          {signedIn && <SidebarNotifications />}

          <section className={signedIn ? 'welcome' : 'signin'}>
            <SidebarUsefulLinks />
            <ButtonGroup>
              {signedIn
                ? <SignOutButton t={t} />
                : <SignInButton t={t} />}
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
          {/* Widgets will go here */}
          <HappeningSoon />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
