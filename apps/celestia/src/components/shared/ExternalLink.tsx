import { AnchorHTMLAttributes, ElementType, FC, ReactNode, ReactNodeArray } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PropTypes extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'id' | 'title' | 'className'> {
  children?: ReactNode | ReactNodeArray;
  href: string;
  tag?: ElementType;
  blank?: boolean;
  icon?: boolean;
}

const ExternalLink: FC<PropTypes> = ({ children, tag = null, href, className, blank = true, icon = false, title, id }) => {
  const Tag = tag || 'a';
  const additionalProps = blank ? { target: '_blank', rel: 'noopener noreferrer' } : null;
  return (
    <Tag href={href} id={id} className={className} title={title} {...additionalProps}>
      {children}
      {icon && <FontAwesomeIcon size="sm" icon="external-link-alt" className="ml-2" />}
    </Tag>
  );
};

export default ExternalLink;
