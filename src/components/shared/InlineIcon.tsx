import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import {
  memo,
  PropsWithChildren,
} from 'react';
import LoadingRing from './LoadingRing';
import { getInlineIconClasses } from '../../utils/inline-icon-classes';

export type InlineIconProps = PropsWithChildren<{
  icon?: IconProp;
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  fixedWidth?: boolean;
  color?: string;
}>;

const InlineIcon: React.FC<InlineIconProps> = (({
  icon,
  loading = false,
  last = false,
  first = false,
  fixedWidth = false,
  color,
  children,
}) => {
  if (loading) {
    return (
      <LoadingRing inline spaceLeft={last} spaceRight={first} color={color} />
    );
  }

  if (children) return <>{children}</>;

  if (!icon) return null;

  return (
    <FontAwesomeIcon
      icon={icon}
      fixedWidth={fixedWidth}
      className={classNames(getInlineIconClasses(color, first, last))}
    />
  );
});

export default memo(InlineIcon);
