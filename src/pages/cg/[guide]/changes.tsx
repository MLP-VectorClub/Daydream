import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { PATHS } from 'src/paths';
import {
  getGuideChangesHeading,
  getGuideLabel,
  handleDataFetchingError,
  notFound,
  resolveGuideName,
} from 'src/utils';
import { useMemo } from 'react';
import { GetColorGuideMajorChangesResult, GuideName, Nullable, Optional } from 'src/types';
import { TitleFactory } from 'src/types/title';
import { colorGuide } from 'src/strings';
import { useMajorChanges, useTitleSetter } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch, wrapper } from 'src/store';
import { validatePageParam } from 'src/utils/validate-page-param';
import { majorChangesFetcher } from 'src/fetchers';
import { titleSetter } from 'src/utils/core';
import Pagination from 'src/components/shared/Pagination';
import { AppearanceLink } from 'src/components/colorguide/AppearanceLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import UserLink from 'src/components/shared/UserLink';
import TimeAgo from 'src/components/shared/TimeAgo';
import styles from 'modules/GuideChangesPage.module.scss';
import NoResultsAlert from 'src/components/shared/NoResultsAlert';
import { Table } from 'reactstrap';
import { GuideNotFound } from 'src/components/colorguide/GuideNotFound';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import ReturnToGuideButton from 'src/components/colorguide/ReturnToGuideButton';
import StatusAlert from 'src/components/shared/StatusAlert';

interface PropTypes {
  guide: Nullable<GuideName>;
  page: number;
  initialData: Nullable<GetColorGuideMajorChangesResult>;
}

const titleFactory: TitleFactory<Omit<PropTypes, 'initialData'>> = ({ guide, page }) => {
  const title = `Page ${page} - ${getGuideChangesHeading(guide)} - Color Guide`;
  const guideLinkProps = guide ? { href: PATHS.GUIDE(guide) } : undefined;
  return {
    title,
    breadcrumbs: [
      { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
      { linkProps: guideLinkProps, label: getGuideLabel(guide) },
      { label: 'Full List', active: true },
    ],
  };
};

const PAGING_RELEVANT_PROPS: string[] = [];

const GuideChangesPage: NextPage<PropTypes> = ({ guide, page, initialData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const heading = getGuideChangesHeading(guide);
  const data = useMajorChanges({ guide, page }, initialData || undefined);

  const titleData = useMemo(() => titleFactory({ guide, page }), [guide, page]);
  useTitleSetter(dispatch, titleData);

  if (guide === null) {
    return <GuideNotFound heading={heading} />;
  }

  return (
    <Content>
      <StandardHeading
        heading={heading}
        lead={data.pagination ? `Displaying ${data.pagination.itemsPerPage} items/page` : null}
      />
      <ButtonCollection>
        <ReturnToGuideButton guide={guide} />
      </ButtonCollection>

      <StatusAlert status={data.status} noun="major changes" />
      {data.changes?.length === 0 && (
        <NoResultsAlert message="There are no changes to display" />
      )}

      {data.pagination && <Pagination {...data.pagination} relevantProps={PAGING_RELEVANT_PROPS} tooltipPos="bottom" />}
      {data.changes && (
        <Table borderless responsive className={styles.changes}>
          <thead>
            <tr>
              <th>Appearance</th>
              <th className="text-left">Reason</th>
              <th>When?</th>
            </tr>
          </thead>
          <tbody>
            {data.changes.map(c => (
              <tr key={c.id}>
                <td><AppearanceLink {...c.appearance} /></td>
                <td className="text-left">{c.reason}</td>
                <td>
                  <div>
                    <InlineIcon icon="clock" first />
                    <TimeAgo date={c.createdAt} />
                  </div>
                  {c.user && (
                    <div>
                      <InlineIcon icon="user" first />
                      <UserLink {...c.user} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {data.pagination && <Pagination {...data.pagination} relevantProps={PAGING_RELEVANT_PROPS} tooltipPos="top" listClassName="mb-0" />}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store, req } = ctx;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    return notFound(ctx);
  }

  const page = validatePageParam(query.page);

  let majorChanges: Optional<GetColorGuideMajorChangesResult>;
  if (guide) {
    try {
      majorChanges = await majorChangesFetcher({ guide, page }, req)();
    } catch (e) {
      handleDataFetchingError(ctx, e);
    }
  }

  const props: PropTypes = {
    guide,
    page,
    initialData: majorChanges || null,
  };
  titleSetter(store, titleFactory(props));
  return { props };
});
export default GuideChangesPage;
