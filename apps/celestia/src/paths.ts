import { isEmpty, mapValues, omit, omitBy } from 'lodash';
import { buildUrl, makeUrlSafe, pathSegmentWithId } from 'src/utils/url';
import { Numeric } from 'src/types/common';
import { FullGuideSortField, GuideName, PreviewAppearance, PublicUser, ShowListItem } from '@mlp-vectorclub/api-types';
import { seasonEpisodeToString } from 'src/utils/show';

/**
 * List of frontend locations for easy reference / URL building
 */
export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  ADMIN: '/admin',
  APPEARANCE: ({ id, label, guide }: PreviewAppearance) => `/cg/${guide}/v/${pathSegmentWithId(id, label)}`,
  SHORT_APPEARANCE: ({ id, label }: Pick<PreviewAppearance, 'id' | 'label'>) => `/cg/v/${pathSegmentWithId(id, label)}`,
  BLENDING: '/blending',
  EVENTS: '/events',
  GUIDE_INDEX: '/cg',
  GUIDE: (guide: GuideName, params?: { page?: string; q?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(
      omitBy(paramsCopy, (el) => typeof el !== 'string' || el.length === 0),
      String
    );
    const path = `/cg/${guide}`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  GUIDE_FULL: (guide: GuideName, params?: { sort_by?: FullGuideSortField }) => {
    let paramsCopy = params;
    if (params && params.sort_by === 'relevance') {
      paramsCopy = omit(params, 'sort_by');
    }
    const queryParams = mapValues(
      omitBy(paramsCopy, (el) => typeof el === 'undefined'),
      String
    );
    const path = `/cg/${guide}/full`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  GUIDE_CHANGES: (guide: GuideName, params?: { page?: string }) => {
    let paramsCopy = params;
    if (params && params.page === '1') {
      paramsCopy = omit(params, 'page');
    }
    const queryParams = mapValues(
      omitBy(paramsCopy, (el) => typeof el === 'undefined'),
      String
    );
    const path = `/cg/${guide}/changes`;
    if (isEmpty(queryParams)) return path;
    return buildUrl(path, queryParams);
  },
  GUIDE_SPRITE: '/cg/sprite',
  LATEST_EPISODE: '/episode/latest',
  PRIVACY_POLICY: '/about/privacy',
  ABOUT_CONNECTION: '/about/connection',
  SHOW: '/show',
  USERS: '/users',
  USER_LEGACY: (username: string) => `/@${username}`,
  USER: (id: Numeric = '[user]') => `/users/${id}`,
  USER_LONG: ({ id, name }: PublicUser) => `/users/${pathSegmentWithId(id, name)}`,
  EPISODE: (show: ShowListItem) => `/episode/${show.generation}/${seasonEpisodeToString(show)}-${makeUrlSafe(show.title)}`,
};
