import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { memo } from 'react';
import LoadingRing from './LoadingRing';
import { getInlineIconClasses } from '../../utils';
import { InlineIconProps } from '../../types/component-props';

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
