import React, { useMemo } from 'react';
import { Nullable } from 'src/types';
import Layout from 'src/components/Layout';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { common } from 'src/strings';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { AppDispatch, wrapper } from 'src/store';
import { useTitleSetter } from 'src/hooks';
import { TitleFactoryVoid } from 'src/types/title';
import { titleSetter } from 'src/utils/core';

interface PropTypes {
  statusCode?: Nullable<number>;
}

const titleFactory: TitleFactoryVoid = () => ({
  title: common.error.withoutStatus,
  breadcrumbs: [
    { label: 'Error' },
    { label: common.error.withoutStatus, active: true },
  ],
});

const Error: NextPage<PropTypes> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const titleData = useMemo(() => titleFactory(), []);
  useTitleSetter(dispatch, titleData);

  return (
    <Layout>
      <Content>
        <StandardHeading heading={common.error.withoutStatus} />
      </Content>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  titleSetter(store, titleFactory());
  return {
    props: {},
  };
});

export default Error;
