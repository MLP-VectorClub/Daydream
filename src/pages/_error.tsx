import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';

interface PropTypes {
  statusCode?: number | null;
}

const Error = (({ statusCode = null }) => {
  const { t } = useTranslation();
  const title = statusCode === null ? statusCode : String(statusCode);
  return (
    <Layout title={title}>
      <p>
        {statusCode
          ? t('error.withStatus', { statusCode })
          : t('error.withoutStatus')}
      </p>
    </Layout>
  );
}) as NextPage<PropTypes>;

Error.getInitialProps = async ({ res, err }) => {
  let statusCode;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default Error;
