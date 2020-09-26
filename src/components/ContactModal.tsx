import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { map, filter, some } from 'lodash';
import { Trans, useTranslation } from 'src/i18n';
import { RootState } from 'src/store/rootReducer';
import { coreActions } from 'src/store/slices';
import ExternalLink from 'src/components/shared/ExternalLink';
import { CLUB_URL, DEV_EMAIL, DISCORD_INVITE_LINK, LANGUAGES } from 'src/config';

const ContactModal: React.FC = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { contactOpen } = useSelector((state: RootState) => state.core);
  const toggle = () => dispatch(coreActions.toggleContact());
  return (
    <Modal className="modal-info" centered isOpen={contactOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{t('contact.header')}</ModalHeader>
      <ModalBody>
        <h3>{t('contact.howTo')}</h3>
        <p>{t('contact.useAnyBelow')}</p>
        <ul>
          <li>
            <Trans t={t} i18nKey="contact.discord">
              <ExternalLink href={DISCORD_INVITE_LINK}>
                0
              </ExternalLink>
              1
              <strong>2</strong>
              3
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="contact.deviantart">
              <ExternalLink href={`${CLUB_URL}/notes/`}>
                0
              </ExternalLink>
              1
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="contact.email" values={{ email: DEV_EMAIL }}>
              <a href={`mailto:${DEV_EMAIL}`}>0</a>
              1
            </Trans>
          </li>
        </ul>
        {some(LANGUAGES, l => !l.enabled) && (
          <>
            <h4 className="alert-heading">{t('contact.lookingForTranslators.title')}</h4>
            <p>{t('contact.lookingForTranslators.intro')}</p>
            <p>{t('contact.lookingForTranslators.wantedLanguages')}</p>
            <ul>
              {map(filter(LANGUAGES, l => !l.enabled), l => <li>{l.nativeName}</li>)}
            </ul>
            <p>{t('contact.lookingForTranslators.howToHelp')}</p>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ContactModal;
