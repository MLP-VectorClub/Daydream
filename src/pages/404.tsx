import { useMemo } from 'react';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { AppDispatch, wrapper } from 'src/store';
import { common } from 'src/strings';
import { TitleFactoryVoid } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { useTitleSetter } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

const titleFactory: TitleFactoryVoid = () => ({
  title: common.titles[404],
  breadcrumbs: [
    { label: 'Error' },
    { label: common.titles[404], active: true },
  ],
});

const NotFound: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const titleData = useMemo(() => titleFactory(), []);
  useTitleSetter(dispatch, titleData);

  return (
    <Content>
      <StandardHeading heading={common.error[404].title} lead={common.error[404].lead} />
    </Content>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  titleSetter(store, titleFactory());
  return {
    props: {},
  };
});

export default NotFound;
