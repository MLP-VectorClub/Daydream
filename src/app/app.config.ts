/**
 * Global prefix for all api calls, no trailing slash
 */
import { GuideName } from 'app/types';
import { NzBreakPoint } from 'ng-zorro-antd';

export const GITHUB_URL = 'https://github.com/SeinopSys/MLPVectorClub';
export const PROJECT_NAME = GITHUB_URL.split('/').pop();
export const CLUB_URL = 'https://www.deviantart.com/mlp-vectorclub';

export const API_PREFIX = '/api/v1';
export const GUEST_AVATAR = '/assets/img/guest.svg';

export const supportedLanguages = ['en'];
export const fallbackLanguage = 'en';
export const localStorageKeys = {
  language: 'language',
};
export const sidebarBreakpoint: NzBreakPoint = 'xl';

export const GUIDE_NAMES: GuideName[] = ['pony', 'eqg'];
