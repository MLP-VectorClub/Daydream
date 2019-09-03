import { GuideName } from 'app/types';
import { range } from 'lodash-es';
import { NzBreakPoint } from 'ng-zorro-antd';

export const GITHUB_URL = 'https://github.com/MLP-VectorClub/Daydream';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const CLUB_URL = 'https://www.deviantart.com/mlp-vectorclub';

/**
 * Global prefix for all api calls, no trailing slash
 */
export const API_PREFIX = '/api/v0';
export const GUEST_AVATAR = '/assets/img/guest.svg';

export const supportedLanguages = ['en'];
export const fallbackLanguage = 'en';
export const sidebarBreakpoint: NzBreakPoint = 'xl';

export const GUIDE_NAMES: GuideName[] = ['pony', 'eqg'];

export const GUIDE_PAGE_SIZES = range(7, 20 + 1);
