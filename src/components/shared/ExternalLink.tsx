import React, { ReactNode, ReactNodeArray } from 'react';

interface PropTypes {
  children: ReactNode | ReactNodeArray;
  href: string;
  tag?: string | React.ElementType;
  blank?: boolean;
  className?: string;
  title?: string;
}

export default (({ children, tag = null, href, className, blank = true, title }) => {
  const Tag = tag || 'a';
  const additionalProps = blank ? { target: '_blank', rel: 'noopener noreferrer' } : null;
  return (
    <Tag href={href} className={className} title={title} {...additionalProps}>
      {children}
    </Tag>
  );
}) as React.FC<PropTypes>;
