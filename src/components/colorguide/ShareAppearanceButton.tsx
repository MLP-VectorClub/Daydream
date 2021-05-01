import {
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';
import {
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import ClipboardJS from 'clipboard';
import { SocialShareButtons } from 'src/components/colorguide/SocialShareButtons';
import styles from 'modules/ShareAppearanceButton.module.scss';

interface PropTypes {
  shortUrl?: string;
}

export const ShareAppearanceButton: VFC<PropTypes> = ({ shortUrl }) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const urlInputRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLElement>(null);

  const startSharing = useCallback(async () => {
    try {
      await navigator.share({ url: shortUrl, title: document.title });
    } catch (e) {
      setShareOpen(true);
    }
  }, [shortUrl]);
  const closeModal = useCallback(() => setShareOpen(false), []);
  const handleModalVisible = useCallback(() => setShareVisible(true), []);
  const handleModalHidden = useCallback(() => setShareVisible(false), []);
  const clearCopyStatus = useCallback(() => setCopyStatus(false), []);

  useEffect(() => {
    if (!shareVisible) return;

    const copyButton = copyButtonRef.current;
    const urlInput = urlInputRef.current;
    const modal = modalRef.current;
    if (!copyButton || !urlInput || !modal) return;

    const clipboard = new ClipboardJS(copyButton, {
      container: modal,
      target: () => urlInput,
    });

    clipboard.on('success', e => {
      setCopyStatus(true);
      e.clearSelection();
    });

    return () => clipboard.destroy();
  }, [shareVisible]);

  if (!shortUrl) return null;

  return (
    <>
      <Button color="primary" size="sm" onClick={startSharing}>
        <InlineIcon icon="share" first />
        Share
      </Button>
      <Modal
        centered
        fade={false}
        isOpen={shareOpen}
        onExit={closeModal}
        innerRef={modalRef}
        onOpened={handleModalVisible}
        onClosed={handleModalHidden}
      >
        <ModalHeader className="bg-ui text-white">
          <InlineIcon icon="share" first />
          Sharing appearance
        </ModalHeader>
        <ModalBody>
          <p>You can use the link below to share this appearance with the world.</p>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className="flex-grow-1">
                <span className={`input-group-text ${styles.appearanceLinkInput}`} ref={urlInputRef}>
                  {shortUrl}
                </span>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <Button color="secondary" innerRef={copyButtonRef} onMouseLeave={clearCopyStatus}>
                  <InlineIcon icon="clipboard" first />
                  Copy
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <p className="h5">Social sharing</p>
            <SocialShareButtons url={shortUrl} />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="ui" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
      {shareVisible && (
        <Tooltip target={copyButtonRef} isOpen={copyStatus} fade={false}>
          Copied to clipboard!
        </Tooltip>
      )}
    </>
  );
};
