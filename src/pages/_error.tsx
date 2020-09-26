import React from 'react';
import { Nullable } from 'src/types';
import { useTranslation } from 'src/i18n';
import Layout from 'src/components/Layout';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { wrapper } from 'src/store';

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
