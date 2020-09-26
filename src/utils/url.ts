import {
  isEmpty,
  mapValues,
  omit,
  omitBy,
  trim,
} from 'lodash';
import buildUrl from 'build-url';
import { Appearance, Numeric, PublicUser } from 'src/types';

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  ADMIN: '/admin',
  APPEARANCE: ({ id, label }: Appearance) => `/cg/v/${id}-${makeUrlSafe(label)}`,
  BLENDING: '/blending',
  EVENTS: '/events',
  GUIDE_INDEX: '/cg',
  GUIDE: (guide = '[guide]', params?: { page?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(omitBy(paramsCopy, el => typeof el === 'undefined'), String);
    const path = `/cg/${guide}`;
    if (isEmpty(queryParams)) return path;
    return buildUrl('', {
      path: `/cg/${guide}`,
      queryParams,
    });
  },
  LATEST_EPISODE: '/episode/latest',
  PRIVACY_POLICY: '/about/privacy',
  SHOW: '/show',
  USERS: '/users',
  USER_LEGACY: (username: string) => `/@${username}`,
  USER: (id: Numeric = '[user]') => `/users/${id}`,
  USER_LONG: ({ id, name }: PublicUser) => `/users/${id}-${makeUrlSafe(name)}`,
};
