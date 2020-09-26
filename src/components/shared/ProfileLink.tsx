import React from 'react';
import Link from 'next/link';
import { getProfileLink, PATHS, ProfileLinkOptions } from 'src/utils';

const ProfileLink: React.FC<ProfileLinkOptions> = ({ children = null, ...rest }) => {
  const content = children === null ? <a>{rest.name}</a> : <>{children}</>;

  if (rest.id === null) {
    return content;
  }

  return (
    <Link href={PATHS.USER()} as={getProfileLink(rest)} passHref={children !== null}>
      {content}
    </Link>
  );
};

export default ProfileLink;
