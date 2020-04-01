import React from 'react';
import { NextComponentType } from 'next';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';
import Content from '../components/shared/Content';
import { AppPageContext, Nullable, WithTFunction } from '../types';
import { coreActions } from '../store/slices';

interface PropTypes {
  statusCode?: Nullable<number>;
}

type StatusHandlerProps = PropTypes & WithTFunction;

const getStatusHandler = (code: Nullable<number>) => {
  switch (code) {
    case 404:
      return (({ t }) => (
        <>
          <h1>{t('error.404.title')}</h1>
          <p className="lead">{t('error.404.lead')}</p>
        </>
      )) as React.FC<StatusHandlerProps>;
    default:
      return (({ t, statusCode }) => (
        <h1>
          {statusCode
            ? t('error.withStatus', { statusCode })
            : t('error.withoutStatus')}
        </h1>
      )) as React.FC<StatusHandlerProps>;
  }
};

const Error = (props => {
  const { statusCode = null } = props;
  const { t } = useTranslation();
  const Handler = getStatusHandler(statusCode);
  return (
    <Layout>
      <Content>
        <Handler t={t} {...props} />
      </Content>
    </Layout>
  );
}) as NextComponentType<AppPageContext, PropTypes, PropTypes>;

Error.getInitialProps = async ({ store, res, err }) => {
  let statusCode;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  const title = statusCode === null ? statusCode : String(statusCode);
  store.dispatch(coreActions.setTitle(title));
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default Error;
