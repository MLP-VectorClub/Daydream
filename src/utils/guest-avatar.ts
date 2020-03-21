import { url } from 'gravatar';
import { GUEST_AVATAR } from '../config';
import { Nullable, Numeric } from '../types';

export const getAvatar = ({ email, size }: { email: Nullable<string>; size: Numeric }) => {
  if (email === null) return GUEST_AVATAR;

  const defaultAvatar = encodeURIComponent(window.location.origin + GUEST_AVATAR);
  return url(email, { size: String(size), d: defaultAvatar });
};
