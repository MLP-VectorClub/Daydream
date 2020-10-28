import { Button, UncontrolledTooltip } from 'reactstrap';
import React, { useRef } from 'react';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';
import TooltipContent from 'src/components/shared/TooltipContent';

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
          <TooltipContent scheduleUpdate={scheduleUpdate}>
            {passwordRevealed ? common.auth.hidePassword : common.auth.showPassword}
          </TooltipContent>
        )}
      </UncontrolledTooltip>
    </>
  );
};

export default RevealPasswordButton;
