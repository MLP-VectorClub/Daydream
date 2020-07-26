import {
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import { useRef } from 'react';
import { useTranslation } from '../../i18n';
import ButtonIcon from './ButtonIcon';

interface RevealPasswordButtonProps {
  setPasswordRevealed: (value: boolean) => void;
  passwordRevealed: boolean;
}

export default (({ setPasswordRevealed, passwordRevealed }) => {
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation('common');
  return (
    <>
      <Button
        outline
        onClick={() => setPasswordRevealed(!passwordRevealed)}
        innerRef={revealBtnRef}
      >
        <ButtonIcon icon={passwordRevealed ? 'eye-slash' : 'eye'} fixedWidth />
      </Button>
      <UncontrolledTooltip target={revealBtnRef}>
        {t(passwordRevealed ? 'auth.hidePassword' : 'auth.showPassword')}
      </UncontrolledTooltip>
    </>
  );
}) as React.FC<RevealPasswordButtonProps>;
