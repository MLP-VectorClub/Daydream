import NextI18Next from 'next-i18next';
import path from 'path';
import { DEFAULT_LANGUAGE, DEV_ENV, LANGUAGES } from './config';

const defaultNS = 'common';

const nextI18next = new NextI18Next({
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: Object.keys(LANGUAGES).filter(el => el !== DEFAULT_LANGUAGE),
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS,
  fallbackNS: defaultNS,
  strictMode: DEV_ENV,
  detection: {
    caches: ['cookie'],
    cookieSecure: true,
    cookieSameSite: 'lax',
    lookupCookie: 'next-i18next',
    order: ['cookie', 'header', 'querystring'],
  },
  localePath: path.resolve('public/static/locales'),
});

if (DEV_ENV) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
  const { applyClientHMR } = require('i18next-hmr/client');
  applyClientHMR(nextI18next.i18n);
}

/* Optionally, export class methods as named exports */
export const {
  Trans,
  useTranslation,
  appWithTranslation,
  i18n,
} = nextI18next;
