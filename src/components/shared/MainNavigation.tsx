import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { getProfileLink, PATHS, permission } from 'src/utils';
import { CLUB_URL } from 'src/config';
import { useAuth, usePrefs } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';

const MainNavigation = () => {
  const { signedIn, user } = useAuth();
  const prefs = usePrefs(signedIn);
  const defaultGuideLink = useMemo<string>(() => (
    prefs?.cgDefaultguide ? PATHS.GUIDE(prefs.cgDefaultguide) : PATHS.GUIDE_INDEX
  ), [prefs]);
  const homeLink = useMemo<string>(() => (
    prefs?.pHomelastep === true ? PATHS.LATEST_EPISODE : defaultGuideLink
  ), [prefs, defaultGuideLink]);

  return (
    <Nav navbar>
      <NavItem>
        {signedIn && (
          <Link href={homeLink} passHref>
            <NavLink>
              <InlineIcon first icon="home" />
              {common.titles.home}
            </NavLink>
          </Link>
        )}
      </NavItem>
      <NavItem>
        <Link href={PATHS.LATEST_EPISODE} passHref>
          <NavLink>{common.titles.latestEpisode}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.SHOW} passHref>
          <NavLink>{common.titles.show}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={defaultGuideLink} passHref>
          <NavLink>{common.titles.colorGuide}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.EVENTS} passHref>
          <NavLink>{common.titles.events}</NavLink>
        </Link>
      </NavItem>
      {signedIn && (
        <NavItem>
          <Link href={getProfileLink(user)} passHref>
            <NavLink>{common.titles.account}</NavLink>
          </Link>
        </NavItem>
      )}
      {permission(user.role, 'staff') && (
        <>
          <NavItem>
            <Link href={PATHS.USERS} passHref>
              <NavLink>{common.titles.users}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href={PATHS.ADMIN} passHref>
              <NavLink>{common.titles.admin}</NavLink>
            </Link>
          </NavItem>
        </>
      )}
      <NavItem>
        <Link href={PATHS.ABOUT} passHref>
          <NavLink>{common.titles.about}</NavLink>
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
