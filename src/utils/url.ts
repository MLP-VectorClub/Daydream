import {
  each,
  isEmpty,
  map,
  mapValues,
  omit,
  omitBy,
  trim,
} from 'lodash';
import {
  AutocompleteAppearance,
  FullGuideSortField,
  GuideName,
  Numeric,
  PublicUser,
} from 'src/types';
import { ParamMap, query } from 'urlcat';

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

// Remove when urlcat fixes https://github.com/balazsbotond/urlcat/issues/106
const queryWithArrays = <T extends ParamMap>(queryParams?: T): string => {
  const array: Record<string, unknown[]> = {};
  const other: ParamMap = {};
  each(queryParams, (value, key) => {
    if (Array.isArray(value)) {
      array[key] = value;
    } else {
      other[key] = value;
    }
  });
  const normalQuery = query(other);
  if (Object.keys(array).length === 0) return normalQuery;

  const arrayQuery = map(array, (val, k) => val.map(el => query({ [`${k}[]`]: String(el) })).join('&')).join('&');
  return normalQuery.length > 0 ? `${normalQuery}&${arrayQuery}` : arrayQuery;
};

export const buildUrl = <T extends ParamMap>(path: string, queryParams?: T) => {
  const queryString = queryParams ? queryWithArrays(queryParams) : false;
  return path + (queryString ? `?${queryString}` : '');
};

export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  ADMIN: '/admin',
  APPEARANCE: ({ id, label }: AutocompleteAppearance) => `/cg/v/${id}-${makeUrlSafe(label)}`,
  BLENDING: '/blending',
  EVENTS: '/events',
  GUIDE_INDEX: '/cg',
  GUIDE: (guide: GuideName, params?: { page?: string; q?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(omitBy(paramsCopy, el => typeof el !== 'string' || el.length === 0), String);
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
