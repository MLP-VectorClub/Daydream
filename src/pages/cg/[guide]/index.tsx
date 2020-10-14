import { Alert } from 'reactstrap';
import React from 'react';
import { ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';
import { AxiosError } from 'axios';
import { GetAppearancesResult, GuideName, Nullable, Optional } from 'src/types';
import {
  getGuideLabel,
  getGuideTitle,
  notFound,
  PATHS,
  resolveGuideName,
  setResponseStatus,
} from 'src/utils';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';
import { guideFetcher, useGuide } from 'src/hooks';
import AppearanceItem from 'src/components/colorguide/AppearanceItem';
import Pagination from 'src/components/shared/Pagination';
import Content from 'src/components/shared/Content';
import { NextPage } from 'next';
import { colorGuide } from 'src/strings';

interface PropTypes {
  guide: Nullable<GuideName>;
  page: number;
  initialData: Nullable<GetAppearancesResult>;
  scrollPosition: ScrollPosition;
}

const ColorGuidePage: NextPage<PropTypes> = ({ guide, page, initialData, scrollPosition }) => {
  const data = useGuide({ guide, page, previews: true }, initialData || undefined);
  const title = getGuideTitle(guide);

  return (
    <Content>
      <h1>{title}</h1>
      {guide === null && (
        <Alert color="danger" className="mt-3 mb-0">There is no guide by the specified name</Alert>
      )}
      {data.pagination && <Pagination {...data.pagination} tooltipPos="bottom" className="mb-3" />}
      {data.appearances && data.appearances.map(el => (
        <AppearanceItem key={el.id} appearance={el} scrollPosition={scrollPosition} />
      ))}
      {data.pagination && <Pagination {...data.pagination} tooltipPos="top" className="mb-3" />}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;

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
      if ('response' in e) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(response);
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

  const title = getGuideTitle(guide, page);
  store.dispatch(coreActions.setTitle(title));
  store.dispatch(coreActions.setBreadcrumbs([
    { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
    { label: getGuideLabel(guide), active: true },
  ]));
  return {
    props: {
      guide,
      page,
      initialData: initialData || null,
    },
  };
});

export default trackWindowScroll<PropTypes>(ColorGuidePage);
