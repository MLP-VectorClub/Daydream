import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import LoadingRing from './LoadingRing';

export interface ButtonIconProps {
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  fixedWidth?: boolean;
  icon: IconProp | null;
}

const ButtonIcon: React.FC<ButtonIconProps> = (({
  icon,
  loading = false,
  last = false,
  first = false,
  fixedWidth = false,
}) => (
  loading ? (
    <LoadingRing inline spaceLeft={last} spaceRight={first} />
  ) : (icon && (
    <FontAwesomeIcon
      icon={icon}
      fixedWidth={fixedWidth}
      className={classNames({ 'ml-2': last, 'mr-2': first })}
    />
  ))
));

export default ButtonIcon;
