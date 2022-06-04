import { each, map, trim } from 'lodash';
import { Numeric } from 'src/types';
import { FavMe } from '@mlp-vectorclub/api-types';
import { ParamMap, query } from 'urlcat';

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

// Remove when urlcat fixes https://github.com/balazsbotond/urlcat/issues/106
const queryWithArrays = <T extends ParamMap>(queryParams?: T): string => {
  const array: Record<string, unknown[]> = {};
  const other: ParamMap = {};
  each(queryParams, (value, key) => {
    if (Array.isArray(value)) {
      array[key] = value;
    } else if (value !== undefined) {
      other[key] = value;
    }
  });
  const normalQuery = query(other);
  if (Object.keys(array).length === 0) return normalQuery;

  const arrayQuery = map(array, (val, k) => val.map((el) => query({ [`${k}[]`]: String(el) })).join('&')).join('&');
  return normalQuery.length > 0 ? `${normalQuery}&${arrayQuery}` : arrayQuery;
};

export const buildUrl = <T extends ParamMap>(path: string, queryParams?: T) => {
  const queryString = queryParams ? queryWithArrays(queryParams) : false;
  return path + (queryString ? `?${queryString}` : '');
};

export const pathSegmentWithId = (id: Numeric, str: string) => {
  const urlSafeString = makeUrlSafe(str);
  return urlSafeString.length === 0 ? `${id}` : `${id}-${urlSafeString}`;
};

export const createFavMeUrl = (favMe: FavMe) => `http://fav.me/${favMe}`;
