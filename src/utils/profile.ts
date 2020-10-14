import {
  Nullable,
  Numeric,
  Optional,
  PageTitle,
  PublicUser,
} from 'src/types';
import { PATHS } from 'src/utils/url';
import { common } from 'src/strings';

export const getProfileTitle = (
  user: Optional<PublicUser>,
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

export const getProfileLink = (props: ProfileLinkOptions) =>
  (props.name ? PATHS.USER_LONG(props as PublicUser) : PATHS.USER(props.id!));
