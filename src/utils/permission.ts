import { FailsafeUser, Nullable, UserRole } from '../types';

export const ROLE_LIST: UserRole[] = [
  'guest', 'user', 'member', 'assistant', 'staff', 'admin', 'developer',
];

export const permission = (
  userRole: UserRole | Nullable<FailsafeUser>,
  checkAgainst: UserRole,
): boolean => {
  let initialRole: UserRole;
  if (typeof userRole === 'string') initialRole = userRole;
  else {
    if (userRole === null) return false;

    initialRole = userRole.role;
  }
  return ROLE_LIST.indexOf(checkAgainst) <= ROLE_LIST.indexOf(initialRole);
};
