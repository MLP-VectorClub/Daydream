import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/store';
import { coreActions } from 'src/store/slices';
import ExternalLink from 'src/components/shared/ExternalLink';
import { DEV_EMAIL, DEVIANTART_GROUP_URL, DISCORD_INVITE_LINK } from 'src/config';
import { FC } from 'react';
import { Trans, useTranslation } from 'next-i18next';

const ContactModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { contactOpen } = useSelector((state: RootState) => state.core);
  const toggle = () => dispatch(coreActions.toggleContact());
  return (
    <Modal className="modal-info" centered isOpen={contactOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{t('common:contact.header')}</ModalHeader>
      <ModalBody>
        <h3>{t('common:contact.howTo')}</h3>
        <p>{t('common:contact.useAnyBelow')}</p>
        <ul>
          <li>
            <Trans t={t} i18nKey="common:contact.discord">
              <ExternalLink href={DISCORD_INVITE_LINK}>0</ExternalLink>1<strong>2</strong>3
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="common:contact.deviantart">
              <ExternalLink href={`${DEVIANTART_GROUP_URL}/notes/`}>0</ExternalLink>1
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="common:contact.email" values={{ email: DEV_EMAIL }}>
              <a href={`mailto:${DEV_EMAIL}`}>0</a>1
            </Trans>
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default ContactModal;
