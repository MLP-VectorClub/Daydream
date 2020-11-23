import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { getDefaultGuideLink, getHomeLink, getProfileLink, PATHS } from 'src/utils';
import { CLUB_URL } from 'src/config';
import { useAuth, usePrefs } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';

const MainNavigation = () => {
  const { signedIn, user, isStaff } = useAuth();
  const prefs = usePrefs(signedIn);
  const defaultGuideLink = useMemo<string>(() => getDefaultGuideLink(prefs), [prefs]);
  const homeLink = useMemo<string>(() => getHomeLink(prefs), [prefs]);

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
      {isStaff ? (
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
      ) : (
        <NavItem>
          <Link href={PATHS.USERS} passHref>
            <NavLink>{common.titles.members}</NavLink>
          </Link>
        </NavItem>
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
