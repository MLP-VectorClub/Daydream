import { NextComponentType } from 'next';
import { Trans, useTranslation } from '../i18n';
import Content from '../components/shared/Content';
import Layout from '../components/Layout';
import ExternalLink from '../components/shared/ExternalLink';
import ContactLink from '../components/shared/ContactLink';
import { coreActions } from '../store/slices';
import { AppPageContext } from '../types';
import { PROD_APP_URL } from '../config';


const PrivacyPolicy = (() => {
  const { t } = useTranslation('privacyPolicy');
  return (
    <Layout>
      <Content className="privacy-policy">
        <h1>{t('title')}</h1>
        <p className="lead">{t('lead')}</p>

        <blockquote>
          <Trans ns="privacyPolicy" i18nKey="tldr">
            <strong>0</strong>
            1
          </Trans>
        </blockquote>

        <p>
          <Trans ns="privacyPolicy" i18nKey="p1">
            0
            <a href={PROD_APP_URL}>{{ host: PROD_APP_URL }}</a>
            2
          </Trans>
        </p>
        <p>{t('p2')}</p>

        <h2>{t('h1')}</h2>
        <p>{t('p3')}</p>
        <p>{t('p4')}</p>
        <p>{t('p5')}</p>
        <p>{t('p6')}</p>
        <p>{t('p7')}</p>
        <p>{t('p8')}</p>
        <p>{t('p9')}</p>

        <h2>{t('h2')}</h2>
        <p>{t('p10')}</p>
        <p>{t('p11')}</p>

        <h2>{t('h3')}</h2>
        <p>{t('p12')}</p>
        <p>{t('p13')}</p>
        <p>{t('p14')}</p>
        <p>{t('p15')}</p>

        <h2>{t('h4')}</h2>
        <p>{t('p16')}</p>
        <p>
          <Trans ns="privacyPolicy" i18nKey="p17">
            0
            <ExternalLink href="https://www.cloudflare.com/security-policy/">1</ExternalLink>
            2
          </Trans>
        </p>
        <p>{t('p18')}</p>
        <p>{t('p19')}</p>

        <h2>{t('h5')}</h2>
        <p>{t('p20')}</p>
        <p>{t('p21')}</p>
        <p>{t('p22')}</p>

        <h2>{t('h6')}</h2>
        <p>
          <Trans ns="privacyPolicy" i18nKey="p23">
            0
            <ContactLink>1</ContactLink>
            2
          </Trans>
        </p>
      </Content>
    </Layout>
  );
}) as NextComponentType<AppPageContext>;

PrivacyPolicy.getInitialProps = async ({ store }) => {
  store.dispatch(coreActions.setTitle('privacyPolicy'));

  return {
    namespacesRequired: ['privacyPolicy'],
  };
};

export default PrivacyPolicy;
