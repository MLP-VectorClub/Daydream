import { useTranslation } from '../i18n';
import { LANGUAGES } from '../config';
import { AvailableLanguage } from '../types';

export const useDateLocale = (): Locale => {
  const { i18n: { language } } = useTranslation();

  return LANGUAGES[language as AvailableLanguage].locale;
};
