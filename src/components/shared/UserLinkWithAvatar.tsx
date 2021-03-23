import Link from 'next/link';
import { PublicUser } from 'src/types';
import styles from 'modules/UserLinkWithAvatar.module.scss';
import { getProfileLink } from 'src/utils/path-utils';
import { VFC } from 'react';

const UserLinkWithAvatar: VFC<PublicUser> = ({ id, name, avatarUrl }) => (
  <Link href={getProfileLink({ id, name })}>
    <a className={`${styles.userLinkWithAvatar} ${styles.local}`}>
      {avatarUrl && <img src={avatarUrl} className={styles.avatar} alt={`avatar of ${name}`} />}
      <span className={styles.name}>{name}</span>
    </a>
  </Link>
);

export default UserLinkWithAvatar;
