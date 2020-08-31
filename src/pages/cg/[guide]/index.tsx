import {
  Alert,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import React from 'react';
import { LazyLoadImage, ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { useTranslation } from '../../../i18n';
import Content from '../../../components/shared/Content';
import {
  GetAppearancesResult,
  GuideName,
  Nullable,
  Optional,
  TitleKeyWithParams,
} from '../../../types';
import { getGuideTitle, notFound, resolveGuideName, setResponseStatus } from '../../../utils';
import { coreActions } from '../../../store/slices';
import { AppPageContext, wrapper } from '../../../store';
import Pagination from '../../../components/shared/Pagination';
import { guideFetcher, useGuide } from '../../../hooks';

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
      {data.appearances && data.appearances.map(el => {
        const sprite = (el.sprite as Nullable<typeof el.sprite>);
        return (
          <Card key={el.id} className="appearance-item mb-3">
            <CardBody className="p-2">
              <Row noGutters>
                {sprite !== null && (
                  <Col xs="auto">
                    <div className="pr-3">
                      <LazyLoadImage
                        className="sprite-image"
                        src={sprite.path}
                        placeholderSrc={sprite.preview}
                        effect="blur"
                        scrollPosition={scrollPosition}
                      />
                    </div>
                  </Col>
                )}
                <Col>
                  <h5>{el.label}</h5>
                  <div className="notes">
                    {/* TODO Parse notes and convert links */}
                    {el.notes && <span dangerouslySetInnerHTML={{ __html: el.notes }} />}
                    {el.hasCutieMarks && (
                      <span className={classNames({ 'ml-2 pl-2 border-left': el.notes })}>
                        {t('appearances.cmAvailable')}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      })}
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
