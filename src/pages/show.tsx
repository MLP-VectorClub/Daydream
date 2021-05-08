import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { common, show } from 'src/strings';
import { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import { useAuth } from 'src/hooks';
import { AddEntryButton } from 'src/components/show/AddEntryButton';
import { GetShowResult, Nullable } from 'src/types';
import { ShowEntriesTable, ShowEntriesTableProps } from 'src/components/show/ShowEntriesTable';
import { wrapper } from 'src/store';
import { TitleFactoryVoid } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { useDispatch } from 'react-redux';
import { useTitleSetter } from 'src/hooks/core';
import { ShowTableColumnDefinition } from 'src/types/show';
import { episodeToString, seasonEpisodeToString } from 'src/utils/show';
import styles from 'modules/ShowPage.module.scss';
import { handleDataFetchingError } from 'src/utils';
import { showListFetcher } from 'src/fetchers/show';
import { validatePageParam } from 'src/utils/validate-page-param';
import { GuideImage } from 'src/components/shared/GuideImage';
import { TitleAirDateColumn } from 'src/components/show/TitleAirDateColumn';

interface ShowPageProps {
  initialEpisodes: Nullable<GetShowResult>;
  initialOthers: Nullable<GetShowResult>;
}

const EPISODE_TABLE_PARAMS: ShowEntriesTableProps['params'] = { order: 'series', types: ['episode'] };
const OTHERS_TABLE_PARAMS: ShowEntriesTableProps['params'] = { order: 'overall', types: ['movie', 'short', 'special'] };

const TITLE_AIR_DATE_COLUMN: ShowTableColumnDefinition = {
  header: 'Title & Air Date',
  renderContent: TitleAirDateColumn,
};

const EPISODE_TABLE_COLUMNS: ShowEntriesTableProps['columns'] = [
  {
    header: 'Generation',
    shortHeader: 'Gen',
    renderContent: ({ entry }) => <GuideImage guide={entry.generation} className={styles.generationImage} tooltip />,
  },
  {
    header: '№',
    only: 'mobile',
    tdClassName: styles.identifier,
    renderContent: ({ entry }) => <>{seasonEpisodeToString(entry)}</>,
  },
  {
    header: 'Season',
    only: 'desktop',
    tdClassName: styles.identifier,
    renderContent: ({ entry }) => <>{entry.season}</>,
  },
  {
    header: 'Episode',
    only: 'desktop',
    tdClassName: styles.identifier,
    renderContent: ({ entry }) => <>{episodeToString(entry)}</>,
  },
  TITLE_AIR_DATE_COLUMN,
];
const OTHERS_TABLE_COLUMNS: ShowEntriesTableProps['columns'] = [
  {
    header: 'Overall #',
    shortHeader: '#',
    tdClassName: styles.identifier,
    renderContent: ({ entry }) => <>{entry.no}</>,
  },
  TITLE_AIR_DATE_COLUMN,
];

const titleFactory: TitleFactoryVoid = () => ({
  title: common.titles.show,
  breadcrumbs: [{
    label: common.titles.show,
    active: true,
  }],
});

const ShowPage: NextPage<ShowPageProps> = ({ initialEpisodes, initialOthers }) => {
  const dispatch = useDispatch();
  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);
  const { isStaff } = useAuth();
  return (
    <Content>
      <Row>
        <Col xs={12} xl className={`mb-3 mb-xl-0 ${styles.column}`}>
          <StandardHeading heading={show.index.episodes.heading} />
          {isStaff && (
            <ButtonCollection>
              <AddEntryButton noun={show.index.episodes.addNoun} />
            </ButtonCollection>
          )}
          <ShowEntriesTable
            columns={EPISODE_TABLE_COLUMNS}
            initialData={initialEpisodes}
            pageQueryParam="eppage"
            params={EPISODE_TABLE_PARAMS}
          />
        </Col>
        <Col xs={12} xl className={styles.column}>
          <StandardHeading heading={show.index.others.heading} />
          {isStaff && (
            <ButtonCollection>
              <AddEntryButton noun={show.index.others.addNoun} />
            </ButtonCollection>
          )}
          <ShowEntriesTable
            columns={OTHERS_TABLE_COLUMNS}
            initialData={initialOthers}
            params={OTHERS_TABLE_PARAMS}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default ShowPage;

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;
  const props: ShowPageProps = {
    initialOthers: null,
    initialEpisodes: null,
  };

  const epPage = validatePageParam(query.eppage);

  try {
    props.initialEpisodes = await showListFetcher({ ...EPISODE_TABLE_PARAMS, page: epPage })();
  } catch (e) {
    handleDataFetchingError(ctx, e);
  }

  const page = validatePageParam(query.page);
  try {
    props.initialOthers = await showListFetcher({ ...OTHERS_TABLE_PARAMS, page })();
  } catch (e) {
    handleDataFetchingError(ctx, e);
  }

  titleSetter(store, titleFactory());
  return { props };
});
