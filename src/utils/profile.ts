import {
  Nullable,
  NullableProps,
  PageTitle,
  PublicUser,
  User,
} from '../types';

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

export type ProfileLinkOptions = NullableProps<Pick<User, 'id' | 'name'>>;

export const getProfileLink = ({ id, name }: ProfileLinkOptions) =>
  `/users/${id}${name ? `-${encodeURI(name)}` : ''}`;
