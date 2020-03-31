import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DEV_EMAIL, DISCORD_INVITE_LINK } from '../config';
import { RootState } from '../store/rootReducer';
import ExternalLink from './shared/ExternalLink';
import { coreActions } from '../store/slices';

export default (() => {
  const dispatch = useDispatch();
  const { contactOpen } = useSelector((state: RootState) => state.core);
  const toggle = () => dispatch(coreActions.toggleContact());
  return (
    <Modal isOpen={contactOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Contact Us</ModalHeader>
      <ModalBody>
        <h3>How to contact us</h3>
        <p>You can use any of the following methods to reach out to us:</p>
        <ul>
          <li>
            <ExternalLink href={DISCORD_INVITE_LINK}>
              Join our Discord server
            </ExternalLink>
            and describe your issue/idea in the <strong>#support</strong> channel
          </li>
          <li>
            <ExternalLink href="https://www.deviantart.com/mlp-vectorclub/notes/">
              Send a note
            </ExternalLink>
            to the group on DeviantArt
          </li>
          <li><a href={`mailto:${DEV_EMAIL}`}>Send an e-mail</a> to {DEV_EMAIL}</li>
        </ul>
      </ModalBody>
    </Modal>
  );
}) as React.FC;
