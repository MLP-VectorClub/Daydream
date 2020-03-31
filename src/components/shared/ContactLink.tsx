import { useDispatch } from 'react-redux';
import { coreActions } from '../../store/slices';

export default (({ children, ...rest }) => {
  const dispatch = useDispatch();
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(coreActions.toggleContact(true));
  };
  return (
    <a href="#" className="send-feedback" onClick={openModal} {...rest}>
      {children}
    </a>
  );
}) as React.FC;
