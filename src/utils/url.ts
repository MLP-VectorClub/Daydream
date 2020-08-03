import { trim, mapValues, omitBy } from 'lodash';
import buildUrl from 'build-url';
import { Appearance, Numeric, PublicUser } from '../types';

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

export const PATHS = {
  ABOUT: '/about',
  ADMIN: '/admin',
  APPEARANCE: ({ id, label }: Appearance) => `/cg/v/${id}-${makeUrlSafe(label)}`,
  BLENDING: '/blending',
  EVENTS: '/events',
  GUIDE: (guide = '[guide]', queryParams?: { page?: string }) => buildUrl('', {
    path: `/cg/${guide}`,
    queryParams: mapValues(omitBy(queryParams, el => typeof el === 'undefined'), String),
  }),
  LATEST_EPISODE: '/episode/latest',
  PRIVACY_POLICY: '/about/privacy',
  SHOW: '/show',
  USERS: '/users',
  USER_LEGACY: (username: string) => `/@${username}`,
  USER: (id: Numeric = '[user]') => `/users/${id}`,
  USER_LONG: ({ id, name }: PublicUser) => `/users/${id}-${makeUrlSafe(name)}`,
};
