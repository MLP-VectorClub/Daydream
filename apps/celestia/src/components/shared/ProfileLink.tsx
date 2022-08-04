import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { ProfileLinkOptions } from 'src/utils';
import { getProfileLink } from 'src/utils/path-utils';

const ProfileLink: FC<ProfileLinkOptions & PropsWithChildren> = ({ children = null, ...rest }) => {
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
