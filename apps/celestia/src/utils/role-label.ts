import { Nullable } from 'src/types';
import { DatabaseRole } from '@mlp-vectorclub/api-types';
import { TFunction } from 'next-i18next';

export const mapRoleLabel = (t: TFunction, role: Nullable<DatabaseRole>): string =>
  t(role === null ? 'common:roleLabel.guest' : `common:roleLabel.${role}`);
