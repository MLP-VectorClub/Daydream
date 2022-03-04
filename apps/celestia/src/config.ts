import { range } from 'lodash';
import Axios from 'axios';
import { ReactQueryConfig } from 'react-query/types/core/types';
import { GuideName } from 'src/types';
import { AppI18nNamespaces } from 'react-i18next';

export const APP_NAME = 'MLP Vector Club';
export const APP_DESCRIPTION = 'Handling requests, reservations & the Color Guide since 2015';
export const APP_HOST = process.env.NEXT_PUBLIC_FRONTEND_HOST as string;
export const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST as string;
export const OLD_SITE_HOST = 'https://mlpvector.club';

export const GITHUB_URL = 'https://github.com/MLP-VectorClub/Celestia';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const BACKEND_GITHUB_URL = 'https://github.com/MLP-VectorClub/Luna';
export const BACKEND_PROJECT_NAME = BACKEND_GITHUB_URL.split('/').pop();
export const DEVIANTART_GROUP_URL = 'https://www.deviantart.com/mlp-vectorclub';
export const DEVIANTART_GROUP_NAME = 'MLP-VectorClub';
export const DISCORD_INVITE_LINK = 'https://discord.mlpvector.club';
export const DEV_EMAIL = 'david@seinopsys.dev';

export const DEV_ENV = process.env.NODE_ENV !== 'production';
export const IS_CLIENT_SIDE = typeof window !== 'undefined';
export const API_DOCS_URL = API_HOST as string;

/**
 * Global prefix for all api calls, no trailing slash
 */
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '';
Axios.defaults.baseURL = IS_CLIENT_SIDE ? API_PREFIX : process.env.NEXT_PUBLIC_BACKEND_HOST;

export const GUEST_AVATAR = '/img/guest.svg';

export const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

export const GUIDE_NAMES: readonly GuideName[] = ['pony', 'eqg', 'pl'] as const;

export const GUIDE_PAGE_SIZES: readonly number[] = range(7, 20 + 1);

export const REACT_QUERY_CONFIG: ReactQueryConfig = {
  queries: {
    staleTime: 60e3,
    keepPreviousData: true,
  },
};

export const DEFAULT_I18N_NAMESPACES: AppI18nNamespaces[] = ['common'];
