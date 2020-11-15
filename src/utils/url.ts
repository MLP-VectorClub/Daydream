import {
  isEmpty,
  mapValues,
  omit,
  omitBy,
  trim,
} from 'lodash';
import {
  CommonAppearance,
  FullGuideSortField,
  GuideName,
  Numeric,
  PublicUser,
} from 'src/types';
import { ParamMap, query } from 'urlcat';

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

export const buildUrl = <T extends ParamMap>(path: string, queryParams?: T) => {
  const queryString = queryParams ? query(queryParams) : false;
  return path + (queryString ? `?${queryString}` : '');
};

export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  ADMIN: '/admin',
  APPEARANCE: ({ id, label }: CommonAppearance) => `/cg/v/${id}-${makeUrlSafe(label)}`,
  BLENDING: '/blending',
  EVENTS: '/events',
  GUIDE_INDEX: '/cg',
  GUIDE: (guide: GuideName, params?: { page?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(omitBy(paramsCopy, el => typeof el === 'undefined'), String);
    const path = `/cg/${guide}`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  GUIDE_FULL: (guide: GuideName, params?: { sort_by?: FullGuideSortField }) => {
    let paramsCopy = params;
    if (params && params.sort_by === 'relevance') {
      paramsCopy = omit(params, 'sort_by');
    }
    const queryParams = mapValues(omitBy(paramsCopy, el => typeof el === 'undefined'), String);
    const path = `/cg/${guide}/full`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  GUIDE_CHANGES: (guide: GuideName, params?: { page?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(omitBy(paramsCopy, el => typeof el === 'undefined'), String);
    const path = `/cg/${guide}/changes`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  LATEST_EPISODE: '/episode/latest',
  PRIVACY_POLICY: '/about/privacy',
  SHOW: '/show',
  USERS: '/users',
  USER_LEGACY: (username: string) => `/@${username}`,
  USER: (id: Numeric = '[user]') => `/users/${id}`,
  USER_LONG: ({ id, name }: PublicUser) => `/users/${id}-${makeUrlSafe(name)}`,
};
