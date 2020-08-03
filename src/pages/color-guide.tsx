import { includes } from 'lodash';
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
import { useTranslation } from '../i18n';
import Content from '../components/shared/Content';
import { GUIDE_NAMES } from '../config';
import {
  GetAppearancesResult,
  GuideName,
  Nullable,
  Optional,
  TitleKeyWithParams,
} from '../types';
import { notFound, requestObservableToPromise, setResponseStatus } from '../utils';
import { getGuideTitle } from '../utils/colorguide';
import { coreActions } from '../store/slices';
import { AppPageContext, wrapper } from '../store';
import Pagination from '../components/shared/Pagination';
import { useGuide } from '../hooks/color-guide';
import { colorGuideService } from '../services';

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store, req } = ctx as typeof ctx & AppPageContext;

  let guide: Optional<GuideName>;
  if (typeof query.guide === 'string' && includes(GUIDE_NAMES, query.guide)) {
    guide = query.guide as GuideName;
  } else {
    notFound(ctx);
  }

  let page = 1;
  if (typeof query.page === 'string') {
    page = parseInt(query.page, 10);
  }

  let initialData: Optional<GetAppearancesResult>;
  if (guide) {
    try {
      initialData = await requestObservableToPromise(colorGuideService.getAppearances({ ...query, guide, page }));
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

  const title = getGuideTitle(req.t, guide, page);
  store.dispatch(coreActions.setTitle(title));
  return {
    props: {
      namespacesRequired: ['colorGuide'],
      guide,
      page,
      initialData,
    },
  };
});

interface PropTypes {
  guide?: GuideName;
  page: number;
  initialData: GetAppearancesResult;
  scrollPosition: ScrollPosition;
}

const ColorGuidePage: React.FC<PropTypes> = ({ guide, page, initialData, scrollPosition }) => {
  const data = useGuide({ guide, page, previews: true }, initialData);
  const { t } = useTranslation('colorGuide');
  const title = getGuideTitle(t, guide);
  const [key, params] = title as TitleKeyWithParams;
  return (
    <Content>
      <h1>{t(`common:titles.${key}`, params)}</h1>
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
                    <LazyLoadImage
                      className="sprite-image pr-3"
                      src={sprite.path}
                      placeholderSrc={sprite.preview}
                      effect="blur"
                      scrollPosition={scrollPosition}
                    />
                  </Col>
                )}
                <Col>
                  <h5>{el.label}</h5>
                  <div className="notes">
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

export default trackWindowScroll<PropTypes>(ColorGuidePage);
