import React from 'react';
import { PublicUser } from 'src/types';
import UserLinkWithAvatar from 'src/components/shared/UserLinkWithAvatar';
import styles from 'modules/StaffMembersList.module.scss';

const StaffMembersList: React.VFC<{ members: PublicUser[] }> = ({ members }) => (
  <div className={styles.staffBlock}>{members.map(m => <UserLinkWithAvatar key={m.id} {...m} />)}</div>
);

export default StaffMembersList;
