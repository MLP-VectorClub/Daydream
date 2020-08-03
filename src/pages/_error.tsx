import React from 'react';
import { useTranslation } from '../i18n';
import Layout from '../components/Layout';
import Content from '../components/shared/Content';
import { Nullable } from '../types';
import { wrapper } from '../store';
import StandardHeading from '../components/shared/StandardHeading';

interface PropTypes {
  statusCode?: Nullable<number>;
}

const Error = (() => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Content>
        <StandardHeading heading={t('error.withoutStatus')} />
      </Content>
    </Layout>
  );
}) as React.FC<PropTypes>;

export const getStaticProps = wrapper.getStaticProps(() => ({
  props: {
    namespacesRequired: ['common'],
  },
}));

export default Error;
