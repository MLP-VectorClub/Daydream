import { NextPage } from 'next';
import Layout from '../components/Layout';
import { useTranslation } from '../i18n';

const ColorGuidePage = (() => {
  const { t } = useTranslation('colorGuide');
  return (
    <Layout title="colorGuide">
      <h1>{t('guideTitle', { guideName: 'Pony' })}</h1>
    </Layout>
  );
}) as NextPage;

ColorGuidePage.getInitialProps = async () => ({
  namespacesRequired: ['colorGuide'],
});

export default ColorGuidePage;
