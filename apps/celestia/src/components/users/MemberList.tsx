import { GetAboutMembersResult, PublicUser, Role } from '@mlp-vectorclub/api-types';
import { useMembers } from 'src/hooks/users';
import { FC, useMemo } from 'react';
import { groupBy } from 'lodash';
import { mapRoleLabel, permission } from 'src/utils';
import pluralize from 'pluralize';
import GroupedUserList from 'src/components/users/GroupedUserList';
import StaffMembersList from 'src/components/users/StaffMembersList';
import { useTranslation } from 'next-i18next';
import StatusAlert from 'src/components/shared/StatusAlert';

interface PropTypes {
  initialMembers?: GetAboutMembersResult;
  isStaff: boolean;
}

type UsersByRole = Record<Role, PublicUser[]>;

const ROLE_SECTIONS: Role[] = ['admin', 'staff', 'assistant', 'member'];

const MemberList: FC<PropTypes> = ({ initialMembers, isStaff }) => {
  const { t } = useTranslation();
  // TODO Handle errors
  const { members, status } = useMembers(initialMembers);
  const membersByRole = useMemo(() => groupBy(members, (m) => m.role) as unknown as UsersByRole, [members]);
  const loadingSubject = isStaff ? t('users:memberList.staff.loadingSubject') : t('users:memberList.public.loadingSubject');

  return (
    <>
      <StatusAlert status={status} subject={loadingSubject} />
      {ROLE_SECTIONS.filter((role) => role in membersByRole).map((role) => {
        const label = mapRoleLabel(t, role);
        const roleMembers = membersByRole[role];
        const isStaffSection = permission(role, 'staff');

        return (
          <section key={role}>
            <h2>
              {roleMembers.length} {pluralize(label, roleMembers.length)}
            </h2>
            {isStaffSection ? <StaffMembersList members={roleMembers} /> : <GroupedUserList users={roleMembers} />}
          </section>
        );
      })}
    </>
  );
};

export default MemberList;
