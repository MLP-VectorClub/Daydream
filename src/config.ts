import { range } from 'lodash';

export const APP_NAME = 'MLP Vector Club';
export const PROD_APP_URL = 'https://new.mlpvector.club';
export const PROD_API_URL = 'https://api.mlpvector.club';

export const GITHUB_URL = 'https://github.com/MLP-VectorClub/Celestia';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const CLUB_URL = 'https://www.deviantart.com/mlp-vectorclub';
export const DISCORD_INVITE_LINK = 'https://discord.gg/hrffb8k';
export const DEV_EMAIL = 'david@seinopsys.dev';

/**
 * Global prefix for all api calls, no trailing slash
 */
export const API_PREFIX = '/api/v0';
export const GUEST_AVATAR = '/img/guest.svg';

export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

export const supportedLanguages = ['en'];
export const fallbackLanguage = 'en';

export const GUIDE_NAMES: string[] = ['pony', 'eqg'];

export const GUIDE_PAGE_SIZES = range(7, 20 + 1);

export const TMDB_REQUIRED_MESSAGE = 'This product uses the TMDb API but is not endorsed or certified by TMDb.';
