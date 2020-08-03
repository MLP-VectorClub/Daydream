import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from 'next/link';
import { getProfileLink, permission } from '../../utils';
import ExternalLink from './ExternalLink';
import { CLUB_URL } from '../../config';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../hooks';

const MainNavigation = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <Nav navbar>
      <NavItem>
        <Link href="/episode/latest" passHref>
          <NavLink>{t('titles.latestEpisode')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/show" passHref>
          <NavLink>{t('titles.show')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/cg/[guide]" as="/cg/pony" passHref>
          <NavLink>{t('titles.colorGuide')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/events" passHref>
          <NavLink>{t('titles.events')}</NavLink>
        </Link>
      </NavItem>
      {user.id && (
        <NavItem>
          <Link href="/users/[user]" as={getProfileLink(user)} passHref>
            <NavLink>{t('titles.account')}</NavLink>
          </Link>
        </NavItem>
      )}
      {permission(user.role, 'staff') && (
        <>
          <NavItem>
            <Link href="/users" passHref>
              <NavLink>{t('titles.users')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/admin" passHref>
              <NavLink>{t('titles.admin')}</NavLink>
            </Link>
          </NavItem>
        </>
      )}
      <NavItem>
        <Link href="/about" passHref>
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
