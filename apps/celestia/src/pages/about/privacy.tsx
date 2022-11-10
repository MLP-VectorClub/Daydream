import { useMemo } from 'react';
import { Alert } from 'reactstrap';
import { APP_HOST } from 'src/config';
import { useAppDispatch, wrapper } from 'src/store';
import Content from 'src/components/shared/Content';
import ExternalLink from 'src/components/shared/ExternalLink';
import ContactLink from 'src/components/shared/ContactLink';
import StandardHeading from 'src/components/shared/StandardHeading';
import styles from 'modules/PrivacyPolicy.module.scss';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { NextPage } from 'next';
import { PATHS } from 'src/paths';
import { useTitleSetter } from 'src/hooks/core';
import { Translatable } from 'src/types';
import { typedServerSideTranslations } from 'src/utils/i18n';
import { Trans, useTranslation } from 'next-i18next';

const titleFactory: TitleFactory = () => {
  const title: Translatable = ['common:titles.privacyPolicy'];
  return {
    title,
    breadcrumbs: [
      {
        label: ['common:titles.about'],
        linkProps: {
          href: PATHS.ABOUT,
        },
      },
      {
        label: title,
        active: true,
      },
    ],
  };
};

const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);

  return (
    <>
      <Alert color="warning" className="p-2 mb-2" fade={false}>
        {t('privacyPolicy:notYetUpdated')}
      </Alert>
      <Content className={styles.privacyPolicy}>
        <StandardHeading heading={t('privacyPolicy:title')} lead={t('privacyPolicy:lead')} />

        <blockquote>
          <Trans t={t} i18nKey="privacyPolicy:shortSummary">
            <strong>0</strong>1
          </Trans>
        </blockquote>

        <p>
          <Trans t={t} i18nKey="privacyPolicy:intro.p1" values={{ host: APP_HOST }}>
            0<a href={APP_HOST}>1</a>2
          </Trans>
        </p>
        <p>{t('privacyPolicy:intro.p2')}</p>

        <h2>{t('privacyPolicy:infoCollectionAndUse.heading')}</h2>
        <p>{t('privacyPolicy:infoCollectionAndUse.p1')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p2')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p3')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p4')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p5')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p6')}</p>
        <p>{t('privacyPolicy:infoCollectionAndUse.p7')}</p>

        <h2>{t('privacyPolicy:logData.heading')}</h2>
        <p>{t('privacyPolicy:logData.p1')}</p>
        <p>{t('privacyPolicy:logData.p2')}</p>

        <h2>{t('privacyPolicy:cookies.heading')}</h2>
        <p>{t('privacyPolicy:cookies.p1')}</p>
        <p>{t('privacyPolicy:cookies.p2')}</p>
        <p>{t('privacyPolicy:cookies.p3')}</p>
        <p>{t('privacyPolicy:cookies.p4')}</p>

        <h2>{t('privacyPolicy:security.heading')}</h2>
        <p>{t('privacyPolicy:security.p1')}</p>
        <p>
          <Trans t={t} i18nKey="privacyPolicy:security.p2" values={{ host: APP_HOST }}>
            0<ExternalLink href="https://www.cloudflare.com/security-policy/">1</ExternalLink>2
          </Trans>
        </p>
        <p>{t('privacyPolicy:security.p3')}</p>
        <p>{t('privacyPolicy:security.p4')}</p>

        <h2>{t('privacyPolicy:changes.heading')}</h2>
        <p>{t('privacyPolicy:changes.p1')}</p>
        <p>{t('privacyPolicy:changes.p2')}</p>
        <p>{t('privacyPolicy:changes.p3')}</p>

        <h2>{t('privacyPolicy:contact.heading')}</h2>
        <p>
          <Trans t={t} i18nKey="privacyPolicy:contact.p1">
            0<ContactLink>1</ContactLink>2
          </Trans>
        </p>
      </Content>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  titleSetter(store, titleFactory());
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['privacyPolicy'])),
    },
  };
});

export default PrivacyPolicy;
