import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { APP_DESCRIPTION, APP_NAME } from 'src/config';
import { useMemo, VFC } from 'react';
import { renderingStateSlice } from 'src/utils/store';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { assembleSeoUrl } from 'src/utils';

const TitleManager: VFC = () => {
  const router = useRouter();
  const { title } = useSelector((store: RootState) => renderingStateSlice(store.core));

  const titleText = useMemo(() => `${!title ? '' : `${title} - `}${APP_NAME}`, [title]);

  return (
    <DefaultSeo
      title={titleText}
      description={APP_DESCRIPTION}
      openGraph={{
        title: titleText,
        type: 'website',
        url: assembleSeoUrl(router.asPath),
        locale: 'en-US',
        site_name: APP_NAME,
        description: APP_DESCRIPTION,
        images: [{
          url: assembleSeoUrl('/img/logo.png'),
        }],
      }}
      twitter={{
        cardType: 'summary',
      }}
    />
  );
};

export default TitleManager;
