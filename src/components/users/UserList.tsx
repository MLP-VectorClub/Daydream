import { useUsers } from 'src/hooks/users';
import GroupedUserList from 'src/components/users/GroupedUserList';
import { VFC } from 'react';
import { useTranslation } from 'next-i18next';
import StatusAlert from 'src/components/shared/StatusAlert';

export const UserList: VFC<{ enabled: boolean }> = ({ enabled }) => {
  const { t } = useTranslation();
  const { users, error, status } = useUsers(enabled);

  if (!users && !error) return null;

  return (
    <section>
      <h2>{t('users:userList.heading', { count: users ? users.length : 0 })}</h2>
      <StatusAlert status={status} subject={t('users:userList.loadingSubject')} />
      {users && <GroupedUserList users={users} />}
    </section>
  );
};
