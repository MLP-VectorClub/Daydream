import BuildUrl from 'build-url';
import md5 from 'md5';
import { GUEST_AVATAR } from '../config';
import { Nullable, Numeric } from '../types';

export const getAvatar = ({ email, size }: { email: Nullable<string>; size: Numeric }) => {
  if (email === null) return GUEST_AVATAR;

  return BuildUrl(`https://s.gravatar.com/avatar/${md5(email)}`, {
    queryParams: {
      s: String(size),
    },
  });
};
