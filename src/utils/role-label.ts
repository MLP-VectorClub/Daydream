import { TFunction } from 'next-i18next';
import { DatabaseRole, Nullable } from 'src/types';

export const mapRoleLabel = (t: TFunction, role: Nullable<DatabaseRole>): string =>
  t(`common:roleLabel.${role || 'guest'}`);
