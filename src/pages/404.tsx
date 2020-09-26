import React from 'react';
import { useTranslation } from 'src/i18n';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  store.dispatch(coreActions.setTitle('404'));
});

const NotFound = (() => {
  const { t } = useTranslation('common');
  return (
    <Content>
      <StandardHeading heading={t('error.404.title')} lead={t('error.404.lead')} />
    </Content>
  );
}) as React.FC;

export default NotFound;
