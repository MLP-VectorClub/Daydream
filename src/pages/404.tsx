import React from 'react';
import { useTranslation } from '../i18n';
import Content from '../components/shared/Content';
import { coreActions } from '../store/slices';
import StandardHeading from '../components/shared/StandardHeading';
import { wrapper } from '../store';

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
