import md5 from 'md5';
import { Nullable, Numeric } from 'src/types';
import { GUEST_AVATAR } from 'src/config';
import { buildUrl } from 'src/utils/url';

interface GetAvatarOptions {
  email: Nullable<string>;
  emailHash?: Nullable<string>;
  size: Numeric;
}

export const getAvatar = ({ email, emailHash, size }: GetAvatarOptions) => {
  let hash = emailHash;
  if (!hash) {
    if (email === null) return GUEST_AVATAR;

    hash = md5(email);
  }

  return buildUrl(`https://s.gravatar.com/avatar/${hash}`, {
    s: String(size),
  });
};
