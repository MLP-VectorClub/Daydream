import { Nullable, Numeric, PageTitle, PublicUser } from 'src/types';
import { PATHS } from 'src/utils/url';

export const getProfileTitle = (
  user?: PublicUser,
  authUserId: Nullable<number> = null,
): PageTitle => {
  if (user) {
    if (authUserId === user.id) {
      return 'yourProfile';
    }
    if (user.name) {
      return ['profileByName', { name: user.name }];
    }
  }
  return 'profile';
};

export type ProfileLinkOptions = {
  id: Nullable<Numeric>;
  name?: Nullable<string>;
};

export const getProfileLink = (props: ProfileLinkOptions) =>
  (props.name ? PATHS.USER_LONG(props as PublicUser) : PATHS.USER(props.id!));
