import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { API_DOCS_URL, GUIDE_NAMES } from 'src/config';
import ExternalLink from 'src/components/shared/ExternalLink';
import { getGuideLabel, PATHS } from 'src/utils';
import Link from 'next/link';
import { GetColorGuidesResult, GuideName } from 'src/types';
import { guideIndexFetcher, useGuideIndex } from 'src/hooks';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';
import { Card, CardBody } from 'reactstrap';
import React from 'react';
import { NextPage } from 'next';
import { plural } from 'src/utils/plural';
import { colorGuide, common } from 'src/strings';
import styles from 'modules/GuideIndexPage.module.scss';

interface PropTypes {
  initialData: GetColorGuidesResult;
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx as typeof ctx;
  let initialData: GetColorGuidesResult = {
    entryCounts: GUIDE_NAMES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {} as Record<GuideName, number>),
  };

  try {
    initialData = await guideIndexFetcher();
  } catch (e) {
    /* ignore */
  }

  store.dispatch(coreActions.setTitle(common.titles.colorGuideList));
  store.dispatch(coreActions.setBreadcrumbs([
    { label: colorGuide.index.breadcrumb, active: true },
  ]));

  const props: PropTypes = {
    initialData,
  };

  return {
    props,
  };
});

const GuideIndexPage: NextPage<PropTypes> = ({ initialData }) => {
  const data = useGuideIndex(initialData);

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
          const logoPath = `/img/logos/${code}.svg`;
          const guideName = getGuideLabel(code);
          const entryCount = data?.entryCounts[code];
          return (
            <Link key={code} href={PATHS.GUIDE(code)}>
              <Card tag="a">
                <CardBody tag="figure">
                  <img
                    src="/img/blank-pixel.png"
                    className={styles.guideIcon}
                    alt={`${guideName} logo`}
                    style={{ backgroundImage: `url(${logoPath})` }}
                  />
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

export default GuideIndexPage;
