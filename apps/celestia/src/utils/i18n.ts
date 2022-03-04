import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppI18nNamespaces } from 'react-i18next';
import { DEFAULT_I18N_NAMESPACES } from 'src/config';

export const typedServerSideTranslations = (locale?: string, keys?: AppI18nNamespaces[]) =>
  serverSideTranslations(locale || 'en', keys ? [...DEFAULT_I18N_NAMESPACES, ...keys] : DEFAULT_I18N_NAMESPACES);
