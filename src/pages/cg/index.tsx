import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { API_DOCS_URL, GUIDE_NAMES } from 'src/config';
import ExternalLink from 'src/components/shared/ExternalLink';
import { getGuideLabel } from 'src/utils';
import Link from 'next/link';
import { GetColorGuideResult, GuideName } from 'src/types';
import { useGuideIndex, useTitleSetter } from 'src/hooks';
import { wrapper } from 'src/store';
import { Card, CardBody } from 'reactstrap';
import { useMemo } from 'react';
import { NextPage } from 'next';
import { plural } from 'src/utils/plural';
import { colorGuide, common } from 'src/strings';
import styles from 'modules/GuideIndexPage.module.scss';
import { useDispatch } from 'react-redux';
import { TitleFactoryVoid } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { guideIndexFetcher } from 'src/fetchers';
import { PATHS } from 'src/paths';
import { GuideImage } from 'src/components/shared/GuideImage';

interface PropTypes {
  initialData: GetColorGuideResult;
}

const titleFactory: TitleFactoryVoid = () => ({
  title: common.titles.colorGuideList,
  breadcrumbs: [
    { label: colorGuide.index.breadcrumb, active: true },
  ],
});

const GuideIndexPage: NextPage<PropTypes> = ({ initialData }) => {
  const dispatch = useDispatch();
  const data = useGuideIndex(initialData);

  const titleData = useMemo(() => titleFactory(), []);
  useTitleSetter(dispatch, titleData);

  return (
    <Content>
      <StandardHeading heading={colorGuide.index.heading} lead={colorGuide.index.lead} />
      <p className="text-center">
        Resources for developers:
        {' '}
        <ExternalLink href={API_DOCS_URL}>API</ExternalLink>
        {' '}
        (WIP)
      </p>

      <div className={styles.guideList}>
        {GUIDE_NAMES.map(code => {
          const guideName = getGuideLabel(code);
          const entryCount = data?.entryCounts[code];
          return (
            <Link key={code} href={PATHS.GUIDE(code)}>
              <Card tag="a">
                <CardBody tag="figure">
                  <GuideImage className={styles.guideIcon} guide={code} />
                  <figcaption>
                    <span className={styles.guideName}>{guideName}</span>
                    <span className={styles.guideCount}>{plural(entryCount, 'entry', 'entries')}</span>
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

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store, req } = ctx as typeof ctx;
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
  return { props };
});

export default GuideIndexPage;
