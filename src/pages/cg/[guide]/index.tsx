import { Alert } from 'reactstrap';
import React from 'react';
import { ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';
import { AxiosError } from 'axios';
import { useTranslation } from 'src/i18n';
import {
  GetAppearancesResult,
  GuideName,
  Nullable,
  Optional,
  TitleKeyWithParams,
} from 'src/types';
import { getGuideTitle, notFound, resolveGuideName, setResponseStatus } from 'src/utils';
import { coreActions } from 'src/store/slices';
import { AppPageContext, wrapper } from 'src/store';
import { guideFetcher, useGuide } from 'src/hooks';
import AppearanceItem from 'src/components/colorguide/AppearanceItem';
import Pagination from 'src/components/shared/Pagination';
import Content from 'src/components/shared/Content';

interface PropTypes {
  guide: Nullable<GuideName>;
  page: number;
  initialData: Nullable<GetAppearancesResult>;
  scrollPosition: ScrollPosition;
}

const ColorGuidePage: React.FC<PropTypes> = ({ guide, page, initialData, scrollPosition }) => {
  const data = useGuide({ guide, page, previews: true }, initialData || undefined);
  const { t } = useTranslation('color-guide');
  const title = getGuideTitle(t, guide);
  const [titleKey, titleParams] = title as TitleKeyWithParams;
  return (
    <Content>
      <h1>{t(`common:titles.${titleKey}`, titleParams)}</h1>
      {guide === null && (
        <Alert color="danger" className="mt-3 mb-0">{t('errors.unknownGuide')}</Alert>
      )}
      {data.pagination && <Pagination {...data.pagination} className="mb-3" />}
      {data.appearances && data.appearances.map(el => (
        <AppearanceItem key={el.id} appearance={el} scrollPosition={scrollPosition} />
      ))}
      {data.pagination && <Pagination {...data.pagination} className="mb-3" />}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store, req } = ctx as typeof ctx & AppPageContext;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    notFound(ctx);
  }

  let page = 1;
  if (typeof query.page === 'string') {
    page = parseInt(query.page, 10);
  }

  let initialData: Optional<GetAppearancesResult>;
  if (guide) {
    try {
      initialData = await guideFetcher({ ...query, guide, page })();
    } catch (e) {
      if (e.response) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(e.response);
        }
      } else {
        console.error(e);
      }
    }
  }

  // TODO Figure out why this causes a redirect loop
  /* if (initialData) {
    const expectedPath = PATHS.GUIDE(guide!, { page: String(initialData.pagination.currentPage) });
    if (fixPath(ctx, expectedPath, ['guide'])) {
      return;
    }
  } */

  const title = getGuideTitle(req.t, guide, page);
  store.dispatch(coreActions.setTitle(title));
  return {
    props: {
      namespacesRequired: ['color-guide'],
      guide,
      page,
      initialData: initialData || null,
    },
  };
});

export default trackWindowScroll<PropTypes>(ColorGuidePage);
