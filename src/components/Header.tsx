import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CLUB_URL } from '../config';
import { permission } from '../utils';
import ExternalLink from './shared/ExternalLink';
import { WithTFunction } from '../types';
import { RootState } from '../store/rootReducer';
import { coreActions } from '../store/slices';

export default (({ t }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { sidebarOpen } = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const toggleSidebar = () => dispatch(coreActions.toggleSidebar(!sidebarOpen));

  return (
    <ScrollContainer>
      <Navbar expand="lg" sticky="top" dark className="bg-primary">
        <NavbarToggler id="account-menu-toggler" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={sidebarOpen ? 'bars' : 'times'} />
        </NavbarToggler>

        <NavbarBrand className="d-lg-none">MLP Vector Club</NavbarBrand>

        <Collapse navbar isOpen>
          <Nav navbar>
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
    </ScrollContainer>
  );
}) as React.FC<WithTFunction>;
