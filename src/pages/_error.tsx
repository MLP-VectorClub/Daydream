import React from 'react';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';
import Content from '../components/shared/Content';
import { Nullable, WithTFunction } from '../types';
import { coreActions } from '../store/slices';
import { AppPageContext, wrapper } from '../store';
import StandardHeading from '../components/shared/StandardHeading';

interface PropTypes {
  statusCode?: Nullable<number>;
}

type StatusHandlerProps = PropTypes & WithTFunction;

const getStatusHandler = (code: Nullable<number>) => {
  switch (code) {
    case 404:
      return (({ t }) => (
        <StandardHeading heading={t('error.404.title')} lead={t('error.404.lead')} />
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
}) as React.FC<PropTypes>;

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store, res } = ctx as typeof ctx & AppPageContext;
  let statusCode;
  if (res) {
    ({ statusCode } = res);
  }
  const title = statusCode === null ? statusCode : String(statusCode);
  store.dispatch(coreActions.setTitle(title));
  return {
    props: {
      namespacesRequired: ['common'],
      statusCode,
    },
  };
});

export default Error;
