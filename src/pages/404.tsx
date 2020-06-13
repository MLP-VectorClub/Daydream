import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';
import Content from '../components/shared/Content';
import { coreActions } from '../store/slices';
import StandardHeading from '../components/shared/StandardHeading';

const NotFound = (() => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  dispatch(coreActions.setTitle('404'));
  return (
    <Layout>
      <Content>
        <StandardHeading heading={t('error.404.title')} lead={t('error.404.lead')} />
      </Content>
    </Layout>
  );
}) as React.FC;

export default NotFound;
