import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { getProfileLink, PATHS, permission } from 'src/utils';
import { CLUB_URL } from 'src/config';
import { useTranslation } from 'src/i18n';
import { useAuth } from 'src/hooks';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { User } from 'src/types';

const MainNavigation = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const getHomePath = useCallback((_u: User) => '/cg', [user.id]);
  return (
    <Nav navbar>
      <NavItem>
        {user.id !== null && (
          <Link href={getHomePath(user)} passHref>
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
        <Link href={PATHS.GUIDE()} as="/cg/pony" passHref>
          <NavLink>{t('titles.colorGuide')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={PATHS.EVENTS} passHref>
          <NavLink>{t('titles.events')}</NavLink>
        </Link>
      </NavItem>
      {user.id !== null && (
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
