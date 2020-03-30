import { NextPage } from 'next';
import { range } from 'lodash';
import Layout from '../components/Layout';
import { useTranslation } from '../i18n';
import Content from '../components/shared/Content';

const ColorGuidePage = (() => {
  const { t } = useTranslation('colorGuide');
  return (
    <Layout title="colorGuide">
      <Content>
        <h1>{t('guideTitle', { guideName: 'Pony' })}</h1>
        {range(0, 50).map(() => <br />)}
      </Content>
    </Layout>
  );
}) as NextPage;

ColorGuidePage.getInitialProps = async () => ({
  namespacesRequired: ['colorGuide'],
});

export default ColorGuidePage;
