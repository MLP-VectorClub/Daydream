import NextI18Next from 'next-i18next';
import path from 'path';
import { DEV_ENV, supportedLanguages } from './config';

// FIXME Remove hardcoded concat
const [defaultLanguage, ...otherLanguages] = supportedLanguages.concat('la');

const nextI18next = new NextI18Next({
  defaultLanguage,
  otherLanguages,
  defaultNS: 'common',
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

export default nextI18next;

/* Optionally, export class methods as named exports */
export const {
  Trans,
  useTranslation,
  appWithTranslation,
  i18n,
} = nextI18next;
