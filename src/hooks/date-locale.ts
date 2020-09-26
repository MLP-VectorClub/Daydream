import { AvailableLanguage } from 'src/types';
import { useTranslation } from 'src/i18n';
import { LANGUAGES } from 'src/config';

export const useDateLocale = (): Locale => {
  const { i18n: { language } } = useTranslation();

  return LANGUAGES[language as AvailableLanguage].locale;
};
