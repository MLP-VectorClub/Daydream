import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { coreActions } from 'src/store/slices';
import ExternalLink from 'src/components/shared/ExternalLink';
import { CLUB_URL, DEV_EMAIL, DISCORD_INVITE_LINK } from 'src/config';
import React from 'react';
import { common } from 'src/strings';

const ContactModal: React.FC = () => {
  const dispatch = useDispatch();
  const { contactOpen } = useSelector((state: RootState) => state.core);
  const toggle = () => dispatch(coreActions.toggleContact());
  return (
    <Modal className="modal-info" centered isOpen={contactOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{common.contact.header}</ModalHeader>
      <ModalBody>
        <h3>{common.contact.howTo}</h3>
        <p>{common.contact.useAnyBelow}</p>
        <ul>
          <li>
            <ExternalLink href={DISCORD_INVITE_LINK}>
              Join our Discord server
            </ExternalLink>
            {' and describe your issue/idea in the '}
            <strong>#support</strong>
            {' channel'}
          </li>
          <li>
            <ExternalLink href={`${CLUB_URL}/notes/`}>
              Send a note
            </ExternalLink>
            {' to the group on DeviantArt'}
          </li>
          <li>
            <a href={`mailto:${DEV_EMAIL}`}>Send an e-mail</a>
            {` to ${DEV_EMAIL}`}
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ContactModal;
