import { DatabaseRole, Nullable } from 'src/types';
import { common } from 'src/strings';

export const mapRoleLabel = (role: Nullable<DatabaseRole>): string =>
  common.roleLabel[role || 'guest'];
