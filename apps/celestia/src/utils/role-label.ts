import { DatabaseRole, Nullable } from 'src/types';
import { TFunction } from 'next-i18next';

export const mapRoleLabel = (t: TFunction, role: Nullable<DatabaseRole>): string =>
  t(role === null ? 'common:roleLabel.guest' : `common:roleLabel.${role}`);
