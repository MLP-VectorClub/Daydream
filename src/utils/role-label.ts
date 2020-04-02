import { TFunction } from 'next-i18next';
import { UserRole } from '../types';

export const mapRoleLabel = (t: TFunction, role: UserRole): string => t(`common:roleLabel.${role}`);
