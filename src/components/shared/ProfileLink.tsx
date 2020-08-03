import React from 'react';
import Link from 'next/link';
import { getProfileLink, ProfileLinkOptions } from '../../utils';

const ProfileLink: React.FC<ProfileLinkOptions> = ({ children = null, ...rest }) => {
  const content = children === null ? <a>{rest.name}</a> : <>{children}</>;

  if (rest.id === null) {
    return content;
  }

  return (
    <Link href={getProfileLink(rest)} passHref={children !== null}>
      {content}
    </Link>
  );
};

export default ProfileLink;
