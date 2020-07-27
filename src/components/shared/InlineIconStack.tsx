import classNames from 'classnames';
import {
  memo,
  PropsWithChildren,
} from 'react';
import LoadingRing from './LoadingRing';
import { getInlineIconClasses } from '../../utils/inline-icon-classes';

export type InlineIconStackProps = PropsWithChildren<{
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  color?: string;
}>;

const InlineIconStack: React.FC<InlineIconStackProps> = (({
  loading = false,
  last = false,
  first = false,
  color,
  children,
}) => {
  if (loading) {
    return (
      <LoadingRing inline spaceLeft={last} spaceRight={first} color={color} />
    );
  }

  return (
    <span className={classNames('fa-layers fa-fw', getInlineIconClasses(color, first, last))}>
      {children}
    </span>
  );
});

export default memo(InlineIconStack);
