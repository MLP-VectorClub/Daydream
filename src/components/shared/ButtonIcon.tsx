import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import LoadingRing from './LoadingRing';

export interface ButtonIconProps {
  loading?: boolean;
  last?: boolean;
  fixedWidth?: boolean;
  icon: IconProp | null;
}

const ButtonIcon: React.FC<ButtonIconProps> = (({
  icon,
  loading = false,
  last = false,
  fixedWidth = false,
}) => (
  loading ? (
    <LoadingRing className={classNames('svg-inline--fa custom-icon', { 'mr-2': !last })} strokeWidth={15} />
  ) : (
    icon && <FontAwesomeIcon icon={icon} fixedWidth={fixedWidth} className={classNames({ 'mr-2': !last })} />
  )
));

export default ButtonIcon;
