import { Button, UncontrolledTooltip } from 'reactstrap';
import { FC, useRef } from 'react';
import InlineIcon from 'src/components/shared/InlineIcon';
import TooltipContent from 'src/components/shared/TooltipContent';
import { useTranslation } from 'next-i18next';

interface RevealPasswordButtonProps {
  setPasswordRevealed: (value: boolean) => void;
  passwordRevealed: boolean;
}

const RevealPasswordButton: FC<RevealPasswordButtonProps> = ({ setPasswordRevealed, passwordRevealed }) => {
  const { t } = useTranslation();
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button color="ui" outline onClick={() => setPasswordRevealed(!passwordRevealed)} innerRef={revealBtnRef}>
        <InlineIcon icon={passwordRevealed ? 'eye-slash' : 'eye'} fixedWidth />
      </Button>
      <UncontrolledTooltip target={revealBtnRef} fade={false}>
        {({ scheduleUpdate }) => (
          <TooltipContent scheduleUpdate={scheduleUpdate}>
            {passwordRevealed ? t('common:auth.hidePassword') : t('common:auth.showPassword')}
          </TooltipContent>
        )}
      </UncontrolledTooltip>
    </>
  );
};

export default RevealPasswordButton;
