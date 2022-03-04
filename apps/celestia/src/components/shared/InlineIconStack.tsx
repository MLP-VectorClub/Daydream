import classNames from 'classnames';
import { FC, memo, PropsWithChildren } from 'react';
import { getInlineIconClasses } from 'src/utils';
import LoadingRing from 'src/components/shared/LoadingRing';

export type InlineIconStackProps = PropsWithChildren<{
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  color?: string;
}>;

const InlineIconStack: FC<InlineIconStackProps> = ({ loading = false, last = false, first = false, color, children }) => {
  if (loading) {
    return <LoadingRing inline spaceLeft={last} spaceRight={first} color={color} />;
  }

  return <span className={classNames('fa-layers fa-fw', getInlineIconClasses(color, first, last))}>{children}</span>;
};

export default memo(InlineIconStack);
