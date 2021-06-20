import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { APP_DESCRIPTION, APP_NAME } from 'src/config';
import { useMemo, VFC } from 'react';
import { renderingStateSlice } from 'src/utils/store';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { assembleSeoUrl } from 'src/utils';
import { pageTitleValue } from 'src/hooks';
import { useTranslation } from 'next-i18next';

const TitleManager: VFC = () => {
  const { t } = useTranslation();
  const { asPath, defaultLocale, locale, locales } = useRouter();
  const { title } = useSelector((store: RootState) => renderingStateSlice(store.core));

  const titleText = useMemo(() => `${!title ? '' : `${pageTitleValue(t, title)} - `}${APP_NAME}`, [t, title]);

  const languageAlternates = useMemo(
    () =>
      locales?.map(hrefLang => ({
        hrefLang,
        href: (hrefLang !== defaultLocale ? `/${hrefLang}` : '') + asPath,
      })),
    [asPath, defaultLocale, locales],
  );

  return (
    <DefaultSeo
      title={titleText}
      description={APP_DESCRIPTION}
      openGraph={{
        title: titleText,
        type: 'website',
        url: assembleSeoUrl(asPath),
        locale,
        site_name: APP_NAME,
        description: APP_DESCRIPTION,
        images: [{
          url: assembleSeoUrl('/img/logo.png'),
        }],
      }}
      twitter={{
        cardType: 'summary',
      }}
      languageAlternates={languageAlternates}
    />
  );
};

export default TitleManager;
