import { Button, UncontrolledTooltip } from 'reactstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from '../../i18n';
import InlineIcon from './InlineIcon';

interface TooltipContentProps {
  scheduleUpdate: () => void;
  text: string;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ scheduleUpdate, text }) => {
  useEffect(() => {
    scheduleUpdate();
  }, [text]);

  return <>{text}</>;
};

interface RevealPasswordButtonProps {
  setPasswordRevealed: (value: boolean) => void;
  passwordRevealed: boolean;
}

const RevealPasswordButton: React.FC<RevealPasswordButtonProps> = ({ setPasswordRevealed, passwordRevealed }) => {
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation('common');
  return (
    <>
      <Button
        color="ui"
        outline
        onClick={() => setPasswordRevealed(!passwordRevealed)}
        innerRef={revealBtnRef}
      >
        <InlineIcon icon={passwordRevealed ? 'eye-slash' : 'eye'} fixedWidth />
      </Button>
      <UncontrolledTooltip target={revealBtnRef} fade={false}>
        {({ scheduleUpdate }) => (
          <TooltipContent text={t(passwordRevealed ? 'auth.hidePassword' : 'auth.showPassword')} scheduleUpdate={scheduleUpdate} />
        )}
      </UncontrolledTooltip>
    </>
  );
};

export default RevealPasswordButton;
