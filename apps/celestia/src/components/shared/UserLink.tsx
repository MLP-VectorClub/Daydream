import Link from 'next/link';
import { ProfileLinkOptions } from 'src/utils';
import { getProfileLink } from 'src/utils/path-utils';
import { FC } from 'react';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
  className?: string;
}

const UserLink: FC<PropTypes> = ({ children, className = 'user-link', ...rest }) => (
  <Link href={getProfileLink(rest)}>
    <a className={className}>{children || rest.name}</a>
  </Link>
);

export default UserLink;
