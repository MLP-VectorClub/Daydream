import { Nullable, PageTitle, PublicUser } from '../types';

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

export const getProfileLink = (username: string) => `/@${encodeURI(username)}`;
