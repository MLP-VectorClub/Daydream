import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { VFC } from 'react';
import Link from 'next/link';
import { CLUB_URL } from 'src/config';
import { useAuth, usePrefs } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';
import { getDefaultGuideLink, getHomeLink, getProfileLink } from 'src/utils/path-utils';
import { PATHS } from 'src/paths';

const MainNavigation: VFC = () => {
  const { signedIn, user, isStaff } = useAuth();
  const prefs = usePrefs(signedIn);
  const defaultGuideLink = getDefaultGuideLink(prefs);
  const homeLink = getHomeLink(prefs);

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
          <NavLink disabled>{common.titles.latestEpisode}</NavLink>
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
          <NavLink disabled>{common.titles.events}</NavLink>
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
              <NavLink disabled>{common.titles.admin}</NavLink>
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
