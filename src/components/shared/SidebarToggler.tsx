import { Fade as Hamburger } from 'hamburger-react';
import { NavbarToggler } from 'reactstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store/rootReducer';
import { coreActions } from '../../store/slices';

export default (() => {
  const { sidebarOpen } = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

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
}) as React.FC;
