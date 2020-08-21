import { range } from 'lodash';
import Axios from 'axios-observable';
import { ReactQueryProviderConfig } from 'react-query';
import huLocale from 'date-fns/locale/hu';
import enLocale from 'date-fns/locale/en-US';
import { AvailableLanguage, GuideName, LanguagesConfig } from './types';

export const APP_NAME = 'MLP Vector Club';
export const OLD_SITE_URL = 'https://mlpvector.club';
export const PROD_APP_URL = 'https://new.mlpvector.club';
export const PROD_API_URL = 'https://api.mlpvector.club';
export const DEV_API_URL = 'https://api.mlpvector.lc';

export const GITHUB_URL = 'https://github.com/MLP-VectorClub/Celestia';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const BACKEND_GITHUB_URL = 'https://github.com/MLP-VectorClub/Luna';
export const BACKEND_PROJECT_NAME = BACKEND_GITHUB_URL.split('/').pop();
export const CLUB_URL = 'https://www.deviantart.com/mlp-vectorclub';
export const DISCORD_INVITE_LINK = 'https://discord.gg/hrffb8k';
export const DEV_EMAIL = 'david@seinopsys.dev';

export const DEV_ENV = process.env.NODE_ENV !== 'production';

/**
 * Global prefix for all api calls, no trailing slash
 */
export const API_PREFIX = process.env.BACKEND_HOST ? '' : '/api';
if (process.env.BACKEND_HOST) {
  Axios.defaults.baseURL = process.env.BACKEND_HOST;
}

export const GUEST_AVATAR = '/img/guest.svg';

export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

export const LANGUAGES: LanguagesConfig = {
  en: {
    nativeName: 'English',
    locale: enLocale,
  },
  hu: {
    nativeName: 'Magyar',
    locale: huLocale,
  },
};

export const DEFAULT_LANGUAGE: AvailableLanguage = 'en';

export const GUIDE_NAMES: GuideName[] = ['pony', 'eqg', 'pl'];

export const GUIDE_PAGE_SIZES = range(7, 20 + 1);

export const REACT_QUERY_CONFIG: ReactQueryProviderConfig = {
  queries: {
    staleTime: 60e3,
  },
};
