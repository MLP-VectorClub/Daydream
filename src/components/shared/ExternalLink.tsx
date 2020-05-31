import React, { ReactNode, ReactNodeArray } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PropTypes {
  children?: ReactNode | ReactNodeArray;
  href: string;
  tag?: string | React.ElementType;
  blank?: boolean;
  icon?: boolean;
  className?: string;
  title?: string;
}

export default (({ children, tag = null, href, className, blank = true, icon = false, title }) => {
  const Tag = tag || 'a';
  const additionalProps = blank ? { target: '_blank', rel: 'noopener noreferrer' } : null;
  return (
    <Tag href={href} className={className} title={title} {...additionalProps}>
      {children}
      {icon && <FontAwesomeIcon size="sm" icon="external-link-alt" className="ml-2" />}
    </Tag>
  );
}) as React.FC<PropTypes>;
