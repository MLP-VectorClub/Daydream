import { Button, UncontrolledTooltip } from 'reactstrap';
import React, { useEffect, useRef } from 'react';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';

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
          <TooltipContent
            text={passwordRevealed ? common.auth.hidePassword : common.auth.showPassword}
            scheduleUpdate={scheduleUpdate}
          />
        )}
      </UncontrolledTooltip>
    </>
  );
};

export default RevealPasswordButton;
