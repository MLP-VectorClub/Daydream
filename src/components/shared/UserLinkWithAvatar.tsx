import Link from 'next/link';
import { getProfileLink } from 'src/utils';
import React from 'react';
import { PublicUser } from 'src/types';
import styles from 'modules/UserLinkWithAvatar.module.scss';

const UserLinkWithAvatar: React.VFC<PublicUser> = ({ id, name, avatarUrl }) => (
  <Link href={getProfileLink({ id, name })}>
    <a className={`${styles.userLinkWithAvatar} ${styles.local}`}>
      <img src={avatarUrl} className={styles.avatar} alt={`avatar of ${name}`} />
      <span className={styles.name}>{name}</span>
    </a>
  </Link>
);

export default UserLinkWithAvatar;
