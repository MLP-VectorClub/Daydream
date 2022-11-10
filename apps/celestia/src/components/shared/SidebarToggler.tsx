import { Fade as Hamburger } from 'hamburger-react';
import { NavbarToggler } from 'reactstrap';
import { useSelector } from 'react-redux';
import { FC, useEffect } from 'react';
import { RootState, useAppDispatch } from 'src/store';
import { coreActions } from 'src/store/slices';

const SidebarToggler: FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.core);
  const dispatch = useAppDispatch();

  const toggleSidebar = () => dispatch(coreActions.toggleSidebar(!sidebarOpen));

  useEffect(() => {
    const sidebarClass = 'sidebar-open';
    if (sidebarOpen) document.body.classList.add(sidebarClass);
    else document.body.classList.remove(sidebarClass);
  }, [sidebarOpen]);

  return (
    <NavbarToggler id="sidebar-toggler" onClick={toggleSidebar}>
      <Hamburger toggled={sidebarOpen} color="currentColor" rounded />
    </NavbarToggler>
  );
};

export default SidebarToggler;
