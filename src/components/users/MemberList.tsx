import { GetAboutMembersResult, PublicUser, Role } from 'src/types';
import { useMembers } from 'src/hooks/users';
import React, { useMemo } from 'react';
import { groupBy } from 'lodash';
import { mapRoleLabel, permission } from 'src/utils';
import pluralize from 'pluralize';
import GroupedUserList from 'src/components/users/GroupedUserList';
import StaffMembersList from 'src/components/users/StaffMembersList';

interface PropTypes {
  initialMembers?: GetAboutMembersResult;
}

type UsersByRole = Record<Role, PublicUser[]>;

const ROLE_SECTIONS: Role[] = ['admin', 'staff', 'assistant', 'member'];

const MemberList: React.VFC<PropTypes> = ({ initialMembers }) => {
  // TODO Handle errors
  const allMembers = useMembers(initialMembers);
  const membersByRole = useMemo(() => groupBy(allMembers, m => m.role) as UsersByRole, [allMembers]);

  return (
    <>
      {ROLE_SECTIONS.filter(role => role in membersByRole).map(role => {
        const label = mapRoleLabel(role);
        const members = membersByRole[role];

        return (
          <section key={role}>
            <h2>{members.length} {pluralize(label, members.length)}</h2>
            {permission(role, 'staff')
              ? <StaffMembersList members={members} />
              : <GroupedUserList users={members} />}
          </section>
        );
      })}
    </>
  );
};

export default MemberList;
