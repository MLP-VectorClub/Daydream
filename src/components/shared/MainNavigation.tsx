import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from '../../routes';
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
        <Link route="/episode/latest" passHref>
          <NavLink>{t('titles.latestEpisode')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link route="/show" passHref>
          <NavLink>{t('titles.show')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link route="/cg/pony" passHref>
          <NavLink>{t('titles.colorGuide')}</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link route="/events" passHref>
          <NavLink>{t('titles.events')}</NavLink>
        </Link>
      </NavItem>
      {user.id && (
        <NavItem>
          <Link route={getProfileLink(user)} passHref>
            <NavLink>{t('titles.account')}</NavLink>
          </Link>
        </NavItem>
      )}
      {permission(user.role, 'staff') && (
        <>
          <NavItem>
            <Link route="/users" passHref>
              <NavLink>{t('titles.users')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link route="/admin" passHref>
              <NavLink>{t('titles.admin')}</NavLink>
            </Link>
          </NavItem>
        </>
      )}
      <NavItem>
        <Link route="/about" passHref>
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
