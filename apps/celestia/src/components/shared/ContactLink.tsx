import { coreActions } from 'src/store/slices';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { useAppDispatch } from 'src/store';

const ContactLink: FC<PropsWithChildren> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const openModal: MouseEventHandler = (e) => {
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
