import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CLUB_URL } from '../config';
import { permission } from '../utils';
import ExternalLink from './shared/ExternalLink';
import { RootState } from '../store/rootReducer';
import { coreActions } from '../store/slices';
import ToTheTopArrow from './shared/ToTheTopArrow';
import { useTranslation } from '../i18n';

export default (() => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { sidebarOpen } = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const toggleSidebar = () => dispatch(coreActions.toggleSidebar(!sidebarOpen));

  return (
    <div id="header">
      <ScrollContainer>
        <Navbar expand="lg" dark className="bg-primary">
          <NavbarToggler id="sidebar-toggler" onClick={toggleSidebar}>
            <FontAwesomeIcon fixedWidth icon={sidebarOpen ? 'times' : 'bars'} size="2x" />
          </NavbarToggler>

          <NavbarBrand className="d-lg-none">MLP Vector Club</NavbarBrand>

          <Collapse navbar isOpen className="d-none d-lg-flex">
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
                <Link href="/cg" passHref>
                  <NavLink>{t('titles.colorGuide')}</NavLink>
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
                  <span className="mr-1">MLP-VectorClub</span>
                  <FontAwesomeIcon icon="external-link-alt" size="sm" />
                </ExternalLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </ScrollContainer>
      <ToTheTopArrow />
    </div>
  );
}) as React.FC;
