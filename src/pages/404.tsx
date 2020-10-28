import React from 'react';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';
import { common } from 'src/strings';

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  store.dispatch(coreActions.setTitle(common.titles[404]));
  store.dispatch(coreActions.setBreadcrumbs([
    { label: 'Error' },
    { label: common.titles[404], active: true },
  ]));

  return {
    props: {},
  };
});

const NotFound: React.FC = () => (
  <Content>
    <StandardHeading heading={common.error[404].title} lead={common.error[404].lead} />
  </Content>
);

export default NotFound;
