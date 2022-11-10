import { UncontrolledTooltip } from 'reactstrap';
import { ElementType, FC, ReactNode, useMemo } from 'react';
import md5 from 'md5';
import { Nullable } from 'src/types';

interface PropTypes {
  id?: Nullable<string>;
  title: string;
  children: ReactNode;
  tag?: ElementType<{ id: string }>;
}

const defaultTag = 'abbr';

const Abbr: FC<PropTypes> = ({ id, title, children, tag: Tag = defaultTag }) => {
  const realId: string = useMemo(() => id || `abbr-${md5(title)}`, [id, title]);
  // Only wrap
  const realChildren =
    typeof id !== 'string' || Tag !== defaultTag ? (
      <Tag id={realId} aria-label={title}>
        {children}
      </Tag>
    ) : (
      children
    );

  return (
    <>
      {realChildren}
      <UncontrolledTooltip target={realId} placement="top" fade={false}>
        {title}
      </UncontrolledTooltip>
    </>
  );
};

export default Abbr;
