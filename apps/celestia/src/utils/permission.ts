import { FailsafeUser, Nullable } from 'src/types';
import { DatabaseRole } from '@mlp-vectorclub/api-types';

export const ROLE_LIST: { [k in DatabaseRole]: number } = {
  user: 1,
  member: 2,
  assistant: 3,
  staff: 3,
  admin: 3,
  developer: 255,
};

export const permission = (role: DatabaseRole | Nullable<FailsafeUser>, checkAgainst: DatabaseRole): boolean => {
  let initialRole: DatabaseRole;
  if (typeof role === 'string') initialRole = role;
  else {
    if (role === null || role.role === null) return false;

    initialRole = role.role;
  }
  return ROLE_LIST[checkAgainst] <= ROLE_LIST[initialRole];
};
