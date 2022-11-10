import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Link from 'next/link';
import { DEVIANTART_GROUP_NAME, DEVIANTART_GROUP_URL } from 'src/config';
import { useAuth, usePrefs } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { getDefaultGuideLink, getHomeLink, getProfileLink } from 'src/utils/path-utils';
import { PATHS } from 'src/paths';
import { useTranslation } from 'next-i18next';

const MainNavigation: FC = () => {
  const { t } = useTranslation();
  const { signedIn, user, isStaff } = useAuth();
  const prefs = usePrefs(signedIn);
  const defaultGuideLink = getDefaultGuideLink(prefs);
  const homeLink = getHomeLink(prefs);

  return (
    <Nav navbar>
      <NavItem>
        {signedIn && (
          <Link href={homeLink} passHref legacyBehavior>
            <NavLink>
              <InlineIcon first icon="home" />
              {t('common:titles.home')}
            </NavLink>
          </Link>
        )}
      </NavItem>
      <NavItem>
        <Link href={PATHS.LATEST_EPISODE} passHref legacyBehavior>
          <NavLink disabled>{t('common:titles.latestEpisode')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.SHOW} passHref legacyBehavior>
          <NavLink>{t('common:titles.show')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={defaultGuideLink} passHref legacyBehavior>
          <NavLink>{t('common:titles.colorGuides')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.EVENTS} passHref legacyBehavior>
          <NavLink disabled>{t('common:titles.events')}</NavLink>
        </Link>
      </NavItem>
      {signedIn && (
        <NavItem>
          <Link href={getProfileLink(user)} passHref legacyBehavior>
            <NavLink>{t('common:titles.account')}</NavLink>
          </Link>
        </NavItem>
      )}
      {isStaff ? (
        <>
          <NavItem>
            <Link href={PATHS.USERS} passHref legacyBehavior>
              <NavLink>{t('common:titles.users')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href={PATHS.ADMIN} passHref legacyBehavior>
              <NavLink disabled>{t('common:titles.admin')}</NavLink>
            </Link>
          </NavItem>
        </>
      ) : (
        <NavItem>
          <Link href={PATHS.USERS} passHref legacyBehavior>
            <NavLink>{t('common:titles.members')}</NavLink>
          </Link>
        </NavItem>
      )}
      <NavItem>
        <Link href={PATHS.ABOUT} passHref legacyBehavior>
          <NavLink>{t('common:titles.about')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <ExternalLink className="nav-link" href={DEVIANTART_GROUP_URL}>
          <span className="mr-1">{DEVIANTART_GROUP_NAME}</span>
          <FontAwesomeIcon icon="external-link-alt" size="sm" />
        </ExternalLink>
      </NavItem>
    </Nav>
  );
};

export default MainNavigation;
