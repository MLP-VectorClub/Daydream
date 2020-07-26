import {
  Nullable,
  NullableProps,
  PageTitle,
  PublicUser,
  User,
} from '../types';

export const getProfileTitle = (
  username: string,
  user: Nullable<PublicUser>,
  authUserId: Nullable<number> = null,
): PageTitle => {
  if (user) {
    if (authUserId === user.id) {
      return 'yourProfile';
    }
  }
  return ['profileByName', { username }];
};

export type ProfileLinkOptions = NullableProps<Pick<User, 'id' | 'name'>>;

export const getProfileLink = ({ id, name }: ProfileLinkOptions) =>
  `/users/${id}${name ? `-${encodeURI(name)}` : ''}`;
