import pluralize from 'pluralize';
import { common } from 'src/strings';
import { useUsers } from 'src/hooks/users';
import InlineIcon from 'src/components/shared/InlineIcon';
import { Alert } from 'reactstrap';
import GroupedUserList from 'src/components/users/GroupedUserList';
import { VFC } from 'react';

const UserList: VFC<{ enabled: boolean }> = ({ enabled }) => {
  const { users, error, isLoading } = useUsers(enabled);

  if (isLoading) {
    return (
      <Alert color="primary" className="text-center">
        <InlineIcon loading className="mr-2" />
        Loading list of users…
      </Alert>
    );
  }

  if (error) {
    if (!enabled) return null;

    return (
      <Alert color="danger">Failed to load list of users</Alert>
    );
  }

  if (!users) return null;

  return (
    <section>
      <h2>{users.length} {pluralize(common.roleLabel.user, users.length)}</h2>
      <GroupedUserList users={users} />
    </section>
  );
};

export default UserList;
