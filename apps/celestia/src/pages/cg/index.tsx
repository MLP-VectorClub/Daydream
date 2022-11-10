import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { API_DOCS_URL, GUIDE_NAMES } from 'src/config';
import ExternalLink from 'src/components/shared/ExternalLink';
import { getGuideLabel } from 'src/utils';
import Link from 'next/link';
import { GetColorGuideResult, GuideName } from '@mlp-vectorclub/api-types';
import { useGuideIndex, useTitleSetter } from 'src/hooks';
import { useAppDispatch, wrapper } from 'src/store';
import { Badge, Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import { useMemo } from 'react';
import { NextPage } from 'next';
import styles from 'modules/GuideIndexPage.module.scss';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { guideIndexFetcher } from 'src/fetchers';
import { PATHS } from 'src/paths';
import pluralize from 'pluralize';
import { GuideIcon } from 'src/components/shared/GuideIcon';
import { SSRConfig, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  initialData: GetColorGuideResult;
}

const titleFactory: TitleFactory = () => ({
  title: ['common:titles.colorGuideList'],
  breadcrumbs: [{ label: ['colorGuide:index.breadcrumb'], active: true }],
});

const GuideIndexPage: NextPage<PropTypes> = ({ initialData }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useGuideIndex(initialData);
  const wipMeaning = 'wip-meaning';

  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);

  return (
    <Content>
      <StandardHeading heading={t('colorGuide:index.heading')} lead={t('colorGuide:index.lead')} />
      <p className="text-center">
        Resources for developers: <ExternalLink href={API_DOCS_URL}>API</ExternalLink>{' '}
        <Badge tag="abbr" color="danger" id={wipMeaning}>
          WIP
        </Badge>
        <UncontrolledTooltip target={wipMeaning} fade={false}>
          Work in Progress
        </UncontrolledTooltip>
      </p>

      <div className={styles.guideList}>
        {GUIDE_NAMES.map((code) => {
          const guideName = getGuideLabel(code);
          const entryCount = data?.entryCounts[code];
          return (
            <Link key={code} href={PATHS.GUIDE(code)} passHref legacyBehavior>
              <Card tag="a">
                <CardBody tag="figure" className={styles.guideFigure}>
                  <div className={styles.guideIcon}>
                    <GuideIcon guide={code} priority />
                  </div>
                  <figcaption>
                    <span className={styles.guideName}>{guideName}</span>
                    <span className={styles.guideCount}>
                      {entryCount} {pluralize('entry', entryCount)}
                    </span>
                  </figcaption>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>((store) => async ({ locale, req }) => {
  let initialData: GetColorGuideResult = {
    entryCounts: GUIDE_NAMES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {} as Record<GuideName, number>),
  };

  try {
    initialData = await guideIndexFetcher(req)();
  } catch (e) {
    /* ignore */
  }

  const props: PropTypes = {
    initialData,
  };
  titleSetter(store, titleFactory());
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['colorGuide'])),
      ...props,
    },
  };
});

export default GuideIndexPage;
