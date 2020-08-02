import { useDispatch } from 'react-redux';
import { coreActions } from '../../store/slices';

const ContactLink: React.FC = ({ children, ...rest }) => {
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
};

export default ContactLink;
