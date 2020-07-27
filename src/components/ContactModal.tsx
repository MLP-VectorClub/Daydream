import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  CLUB_URL,
  DEV_EMAIL,
  DISCORD_INVITE_LINK,
} from '../config';
import { RootState } from '../store/rootReducer';
import { coreActions } from '../store/slices';
import ExternalLink from './shared/ExternalLink';
import {
  useTranslation,
  Trans,
} from '../i18n';

export default (() => {
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
      </ModalBody>
    </Modal>
  );
}) as React.FC;
