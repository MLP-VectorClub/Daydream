import { Nullable, Numeric, PageTitle, PublicUser } from 'src/types';
import { common } from 'src/strings';

export const getProfileTitle = (
  user: Nullable<PublicUser> = null,
  authUserId: Nullable<number> = null,
): PageTitle => {
  if (user) {
    if (authUserId === user.id) {
      return common.titles.yourProfile;
    }
    if (user.name) {
      return common.titles.profileByName(user.name);
    }
  }
  return common.titles.profile;
};

export type ProfileLinkOptions = {
  id: Nullable<Numeric>;
  name?: Nullable<string>;
};
