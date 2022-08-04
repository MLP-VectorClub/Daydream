import { Button } from 'reactstrap';
import MainNavigation from 'src/components/shared/MainNavigation';
import SidebarUserInfo from 'src/components/shared/SidebarUserInfo';
import ExternalLink from 'src/components/shared/ExternalLink';
import { DISCORD_INVITE_LINK } from 'src/config';
import SidebarNotifications from 'src/components/shared/SidebarNotifications';
import HappeningSoon from 'src/components/widgets/HappeningSoon';
import SidebarUsefulLinks from 'src/components/shared/SidebarUsefulLinks';
import InlineIcon from 'src/components/shared/InlineIcon';
import SignInButton from 'src/components/shared/SignInButton';
import SignOutButton from 'src/components/shared/SignOutButton';
import { useAuth, useConnectionInfo } from 'src/hooks';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

const Sidebar: FC = () => {
  const { t } = useTranslation();
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
          <h2>{t('common:sidebar.welcome')}</h2>
          <p>{t('common:sidebar.backendDown')}</p>
        </section>
      )}
      {!backendDown && (
        <>
          {signedIn && <SidebarNotifications />}

          <section className={signedIn ? 'welcome' : 'signin'}>
            <SidebarUsefulLinks />
            <div className="mb-2">{signedIn ? <SignOutButton /> : <SignInButton />}</div>
            <Button color="discord" size="sm" tag={ExternalLink} href={DISCORD_INVITE_LINK}>
              <InlineIcon icon={['fab', 'discord']} first />
              {t('common:sidebar.joinDiscord')}
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
