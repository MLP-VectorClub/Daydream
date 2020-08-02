import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { memo } from 'react';
import LoadingRing from './LoadingRing';
import { getInlineIconClasses } from '../../utils/inline-icon-classes';

export type InlineIconProps = {
  icon?: IconProp;
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  color?: string;
} & Omit<FontAwesomeIconProps, 'icon'>;

const InlineIcon: React.FC<InlineIconProps> = (({
  icon,
  loading = false,
  last = false,
  first = false,
  color,
  className,
  ...faProps
}) => {
  if (loading) {
    return (
      <LoadingRing inline spaceLeft={last} spaceRight={first} color={color} className={className} />
    );
  }

  if (!icon) return null;

  return (
    <FontAwesomeIcon
      icon={icon}
      className={classNames(className, getInlineIconClasses(color, first, last))}
      {...faProps}
    />
  );
});

export default memo(InlineIcon);
