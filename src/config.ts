import { range } from 'lodash';
import Axios from 'axios-observable';
import { GuideName } from './types';

export const APP_NAME = 'MLP Vector Club';
export const PROD_APP_URL = 'https://new.mlpvector.club';
export const PROD_API_URL = 'https://api.mlpvector.club';
export const DEV_API_URL = 'https://api.mlpvector.lc';

export const GITHUB_URL = 'https://github.com/MLP-VectorClub/Celestia';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const CLUB_URL = 'https://www.deviantart.com/mlp-vectorclub';
export const DISCORD_INVITE_LINK = 'https://discord.gg/hrffb8k';
export const DEV_EMAIL = 'david@seinopsys.dev';

export const DEV_ENV = process.env.NODE_ENV !== 'production';

/**
 * Global prefix for all api calls, no trailing slash
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API_PREFIX = (process as any).browser ? '/api' : '';
export const GUEST_AVATAR = '/img/guest.svg';

export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

export const supportedLanguages = ['en'];
export const fallbackLanguage = 'en';

export const GUIDE_NAMES: GuideName[] = ['pony', 'eqg', 'pl'];

export const GUIDE_PAGE_SIZES = range(7, 20 + 1);

export const TMDB_REQUIRED_MESSAGE = 'This product uses the TMDb API but is not endorsed or certified by TMDb.';

export enum RouteParams {
  USERNAME = ':username',
  ID = ':id([0-9]+)',
  GUIDE = ':guide',
}

export enum RouteSegments {
  COLORGUIDE = '(cg|colorguide)',
  APPEARANCE = '(v|appearance)',
}

export const PATHS = {
  ABOUT: '/about',
  PRIVACY_POLICY: '/about/privacy',
  USER_LEGACY: `/@${RouteParams.USERNAME}`,
  USER: `/users/${RouteParams.ID}`,
  USER_LONG: `/users/${RouteParams.ID}-${RouteParams.USERNAME}`,
  GUIDE: `/${RouteSegments.COLORGUIDE}/${RouteParams.GUIDE}`,
  APPEARANCE: `/${RouteSegments.COLORGUIDE}/${RouteSegments.APPEARANCE}/${RouteParams.GUIDE}`,
};

export const fetcher = (...args: Parameters<typeof Axios.request>) => Axios.request(...args).toPromise().then(res => res.data);
