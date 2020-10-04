import React from 'react';
import { Nullable } from 'src/types';
import Layout from 'src/components/Layout';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { common } from 'src/strings';

interface PropTypes {
  statusCode?: Nullable<number>;
}

const Error: React.FC<PropTypes> = () => (
  <Layout>
    <Content>
      <StandardHeading heading={common.error.withoutStatus} />
    </Content>
  </Layout>
);

export default Error;
