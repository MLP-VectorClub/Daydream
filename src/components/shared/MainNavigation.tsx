import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { getProfileLink, PATHS, permission } from 'src/utils';
import { CLUB_URL } from 'src/config';
import { useTranslation } from 'src/i18n';
import { useAuth } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { usePrefs } from 'src/hooks/prefs';
import { LinkProps } from 'next/dist/client/link';

const MainNavigation = () => {
  const { t } = useTranslation();
  const { signedIn, user } = useAuth();
  const prefs = usePrefs(signedIn);
  const defaultGuideLinkProps = useMemo<LinkProps>(() => {
    if (prefs?.cgDefaultguide) {
      return { href: PATHS.GUIDE(), as: PATHS.GUIDE(prefs.cgDefaultguide) };
    }

    return { href: PATHS.GUIDE_INDEX, as: PATHS.GUIDE_INDEX };
  }, [prefs]);
  const homeLinkProps = useMemo<LinkProps>(() => {
    if (prefs?.pHomelastep === true) {
      return { href: PATHS.LATEST_EPISODE };
    }

    return defaultGuideLinkProps;
  }, [prefs, defaultGuideLinkProps]);

  return (
    <Nav navbar>
      <NavItem>
        {signedIn && (
          <Link {...homeLinkProps} passHref>
            <NavLink>
              <InlineIcon first icon="home" />
              {t('titles.home')}
            </NavLink>
          </Link>
        )}
      </NavItem>
      <NavItem>
        <Link href={PATHS.LATEST_EPISODE} passHref>
          <NavLink>{t('titles.latestEpisode')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.SHOW} passHref>
          <NavLink>{t('titles.show')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link {...defaultGuideLinkProps} passHref>
          <NavLink>{t('titles.colorGuide')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.EVENTS} passHref>
          <NavLink>{t('titles.events')}</NavLink>
        </Link>
      </NavItem>
      {signedIn && (
        <NavItem>
          <Link href={PATHS.USER()} as={getProfileLink(user)} passHref>
            <NavLink>{t('titles.account')}</NavLink>
          </Link>
        </NavItem>
      )}
      {permission(user.role, 'staff') && (
        <>
          <NavItem>
            <Link href={PATHS.USERS} passHref>
              <NavLink>{t('titles.users')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href={PATHS.ADMIN} passHref>
              <NavLink>{t('titles.admin')}</NavLink>
            </Link>
          </NavItem>
        </>
      )}
      <NavItem>
        <Link href={PATHS.ABOUT} passHref>
          <NavLink>{t('titles.about')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <ExternalLink className="nav-link" href={CLUB_URL}>
          <span className="mr-1">MLP-VectorClub</span>
          <FontAwesomeIcon icon="external-link-alt" size="sm" />
        </ExternalLink>
      </NavItem>
    </Nav>
  );
};

export default MainNavigation;
