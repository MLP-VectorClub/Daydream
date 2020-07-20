import { includes } from 'lodash';
import { NextComponentType } from 'next';
import { Alert, Pagination, PaginationItem } from 'reactstrap';
import Layout from '../components/Layout';
import { useTranslation, i18n } from '../i18n';
import Content from '../components/shared/Content';
import { GUIDE_NAMES } from '../config';
import { Nullable, TitleKeyWithParams } from '../types';
import { notFound } from '../utils';
import { getGuideTitle } from '../utils/colorguide';
import { coreActions } from '../store/slices';
import { AppPageContext } from '../store';

interface PropTypes {
  guide: Nullable<string>;
  page: Nullable<string>;
}

const ColorGuidePage = (({ guide, page }) => {
  const { t } = useTranslation('colorGuide');
  const title = getGuideTitle(t, guide);
  const [key, params] = title as TitleKeyWithParams;
  return (
    <Layout>
      <Content>
        <h1>{t(`common:titles.${key}`, params)}</h1>
        {guide === null && (
          <Alert color="danger" className="mt-3 mb-0">{t('errors.unknownGuide')}</Alert>
        )}
        <Pagination>
          <PaginationItem>{page}</PaginationItem>
        </Pagination>
      </Content>
    </Layout>
  );
}) as NextComponentType<AppPageContext<{ query: PropTypes }>, PropTypes, PropTypes>;

ColorGuidePage.getInitialProps = async ctx => {
  const { query, store, req } = ctx;
  let { guide } = query;
  const { page = '1' } = query;
  if (!includes(GUIDE_NAMES, guide)) {
    notFound(ctx);
    guide = null;
  }

  const tf = req ? req.t : i18n.t.bind(i18n);

  const title = getGuideTitle(tf, guide, page);
  store.dispatch(coreActions.setTitle(title));
  return ({
    namespacesRequired: ['colorGuide'],
    guide,
    page,
  });
};

export default ColorGuidePage;
