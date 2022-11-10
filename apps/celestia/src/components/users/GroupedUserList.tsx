import { BarePublicUser } from '@mlp-vectorclub/api-types';
import { groupBy } from 'lodash';
import { FC, useMemo } from 'react';
import UserLink from 'src/components/shared/UserLink';
import styles from 'modules/GroupedUserList.module.scss';

const ORDER_STRING = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const getFirstLetter = (user: BarePublicUser): string => (/^[a-z]/i.test(user.name) ? user.name[0].toUpperCase() : '#');

const GroupedUserList: FC<{ users: BarePublicUser[] }> = ({ users }) => {
  const groupedUsers = useMemo(() => groupBy(users, getFirstLetter), [users]);
  const groupKeys = Object.keys(groupedUsers).sort((a, b) => ORDER_STRING.indexOf(a) - ORDER_STRING.indexOf(b));

  return (
    <div>
      {groupKeys.map((key) => (
        <span key={key} className={styles.letterGroup}>
          <strong>{key}</strong>
          {groupedUsers[key] && groupedUsers[key].map((u) => <UserLink key={u.id} {...u} className={styles.userLink} />)}
        </span>
      ))}
    </div>
  );
};
export default GroupedUserList;
