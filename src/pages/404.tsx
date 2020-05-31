import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';
import Content from '../components/shared/Content';
import { coreActions } from '../store/slices';

const NotFound = (() => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  dispatch(coreActions.setTitle('404'));
  return (
    <Layout>
      <Content>
        <h1>{t('error.404.title')}</h1>
        <p className="lead">{t('error.404.lead')}</p>
      </Content>
    </Layout>
  );
}) as React.FC;

export default NotFound;
