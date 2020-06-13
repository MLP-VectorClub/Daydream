import NextI18Next from 'next-i18next';
import { supportedLanguages } from './config';

// FIXME Remove hardcoded concat
const [defaultLanguage, ...otherLanguages] = supportedLanguages.concat('la');

const nextI18next = new NextI18Next({
  defaultLanguage,
  otherLanguages,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  cookieSecure: true,
  cookieSameSite: 'lax',
});

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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
