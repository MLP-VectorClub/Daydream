import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { memo, VFC } from 'react';
import { getInlineIconClasses } from 'src/utils';
import { InlineIconProps } from 'src/types/component-props';
import LoadingRing from 'src/components/shared/LoadingRing';

const InlineIcon: VFC<InlineIconProps> = ({
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
};

export default memo(InlineIcon);
