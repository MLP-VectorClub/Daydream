import { UserRole } from '../types';

const ROLE_LABEL_MAP: { [key in UserRole]: string } = {
  guest: 'Guest',
  user: 'DeviantArt User',
  member: 'Club Member',
  assistant: 'Assistant',
  staff: 'Staff',
  admin: 'Administrator',
  developer: 'Site Developer',
};

export const mapRoleLabel = (role: UserRole): string => ROLE_LABEL_MAP[role];
