import NextI18Next from 'next-i18next';

const nextI18next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['hu'],
  defaultNS: 'global',
});

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { applyClientHMR } = require('i18next-hmr/client');
  applyClientHMR(nextI18next.i18n);
}

export default nextI18next;

/* Optionally, export class methods as named exports */
export const {
  useTranslation,
  appWithTranslation,
} = nextI18next;
