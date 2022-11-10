import styles from 'modules/SocialShareButtons.module.scss';
import { FC, useRef } from 'react';
import { EmailShareButton, TelegramShareButton, TwitterShareButton, VKShareButton, WhatsappShareButton } from 'react-share';
import InlineIcon from 'src/components/shared/InlineIcon';
import { UncontrolledTooltip } from 'reactstrap';

interface PropTypes {
  url: string;
}

export const SocialShareButtons: FC<PropTypes> = ({ url }) => {
  const telegramRef = useRef<HTMLButtonElement>(null);
  const twitterRef = useRef<HTMLButtonElement>(null);
  const whatsappRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLButtonElement>(null);
  const vkRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={styles.socialSharing}>
      <TelegramShareButton ref={telegramRef} className={styles.telegramColor} url={url}>
        <InlineIcon icon={['fab', 'telegram']} color="" />
      </TelegramShareButton>
      <UncontrolledTooltip target={telegramRef} placement="bottom" fade={false}>
        Telegram
      </UncontrolledTooltip>
      <TwitterShareButton ref={twitterRef} className={styles.twitterColor} url={url} title={document.title}>
        <InlineIcon icon={['fab', 'twitter']} />
      </TwitterShareButton>
      <UncontrolledTooltip target={twitterRef} placement="bottom" fade={false}>
        Twitter
      </UncontrolledTooltip>
      <WhatsappShareButton ref={whatsappRef} className={styles.whatsappColor} url={url} title={document.title}>
        <InlineIcon icon={['fab', 'whatsapp']} />
      </WhatsappShareButton>
      <UncontrolledTooltip target={whatsappRef} placement="bottom" fade={false}>
        Whatsapp
      </UncontrolledTooltip>
      <EmailShareButton ref={emailRef} className={styles.emailColor} url={url}>
        <InlineIcon icon="envelope" />
      </EmailShareButton>
      <UncontrolledTooltip target={emailRef} placement="bottom" fade={false}>
        Email
      </UncontrolledTooltip>
      <VKShareButton ref={vkRef} className={styles.vkColor} url={url} title={document.title}>
        <InlineIcon icon={['fab', 'vk']} />
      </VKShareButton>
      <UncontrolledTooltip target={vkRef} placement="bottom" fade={false}>
        VK
      </UncontrolledTooltip>
    </div>
  );
};
