import {
  Collapse,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLUB_URL } from '../config';
import { permission } from '../utils';
import AvatarWrap from './shared/AvatarWrap';
import ExternalLink from './shared/ExternalLink';
import { WithTFunction } from '../types';
import AccountMenuContents from './AccountMenuContents';
import { RootState } from '../store/rootReducer';

export default (({ t }) => {
  const [accountMenuCollapsed, setAccountMenuCollapsed] = useState(true);
  const [navCollapsed, setNavCollapsed] = useState(true);
  const toggleAccountMenu = () => setAccountMenuCollapsed(!accountMenuCollapsed);
  const toggleNav = () => setNavCollapsed(!navCollapsed);

  const { user, signedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const accountMenuContents = (
    <AccountMenuContents
      t={t}
      user={user}
      signedIn={signedIn}
      dispatch={dispatch}
    />
  );

  return (
    <Navbar expand="lg" sticky="top" dark className="bg-primary">
      <NavbarToggler id="account-menu-toggler" onClick={toggleAccountMenu}>
        <span className="sr-only">{t('header.accountMenu')}</span>
        <AvatarWrap
          avatarUrl={user.avatarUrl}
          avatarProvider={user.avatarProvider}
          size={40}
          email={user.email}
        />
      </NavbarToggler>

      <NavbarBrand className="d-lg-none">MLP Vector Club</NavbarBrand>

      <NavbarToggler onClick={toggleNav}>
        {/* Replace with Hamburger once https://github.com/luukdv/hamburger-react/issues/9 is fixed */}
        <FontAwesomeIcon fixedWidth icon={navCollapsed ? 'bars' : 'times'} />
      </NavbarToggler>

      <Collapse navbar id="account-menu" isOpen={!accountMenuCollapsed}>
        <Nav navbar>
          {accountMenuContents}
        </Nav>
      </Collapse>

      <Collapse navbar isOpen={!navCollapsed}>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar className="d-none d-lg-block p-0">
            <DropdownToggle nav id="desktop-account-dropdown-toggler" className="p-0">
              <AvatarWrap
                avatarUrl={user.avatarUrl}
                avatarProvider={user.avatarProvider}
                size={40}
                email={user.email}
              />
              <span className="sr-only">{t('header.accountMenu')}</span>
              <i className="fa fa-chevron-down dd-label" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="desktop-account-dropdown-toggler"
              id="desktop-account-dropdown"
            >
              <Nav className="mx-2 flex-column">
                {accountMenuContents}
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link href="/cg" passHref>
              <NavLink>{t('titles.colorGuide')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/show" passHref>
              <NavLink>{t('titles.show')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/events" passHref>
              <NavLink>{t('titles.events')}</NavLink>
            </Link>
          </NavItem>
          {permission(user.role, 'staff') && (
            <NavItem>
              <Link href="/admin" passHref>
                <NavLink>{t('titles.admin')}</NavLink>
              </Link>
            </NavItem>
          )}
          <NavItem>
            <Link href="/about" passHref>
              <NavLink>{t('titles.about')}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <ExternalLink className="nav-link" href={CLUB_URL}>
              MLP-VectorClub
              <FontAwesomeIcon icon="external-link-alt" />
            </ExternalLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}) as React.FC<WithTFunction>;
