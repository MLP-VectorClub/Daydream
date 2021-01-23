import Link from 'next/link';
import { ProfileLinkOptions } from 'src/utils';
import React from 'react';
import { getProfileLink } from 'src/utils/path-utils';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
  userLinkClass?: string;
}

const UserLink: React.FC<PropTypes> = ({ text, userLinkClass = 'user-link', ...rest }) => (
  <Link href={getProfileLink(rest)}>
    <a className={userLinkClass}>{text || rest.name}</a>
  </Link>
);

export default UserLink;
