import {
  Collapse,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import ScrollContainer from 'react-indiana-drag-scroll';
import ToTheTopArrow from './shared/ToTheTopArrow';
import MainNavigation from './shared/MainNavigation';
import SidebarToggler from './shared/SidebarToggler';

export default (() => (
  <div id="header">
    <ScrollContainer>
      <Navbar expand="lg" dark className="bg-primary">
        <SidebarToggler />

        <NavbarBrand className="d-lg-none">MLP Vector Club</NavbarBrand>

        <Collapse navbar isOpen className="d-none d-lg-flex">
          <MainNavigation />
        </Collapse>
      </Navbar>
    </ScrollContainer>
    <ToTheTopArrow />
  </div>
)) as React.FC;
