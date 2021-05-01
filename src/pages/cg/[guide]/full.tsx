import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import { useMemo } from 'react';
import StandardHeading from 'src/components/shared/StandardHeading';
import {
  fullListSortOptionsMap,
  getFullGuideHeading,
  getFullGuideTitle,
  getGuideLabel,
  handleDataFetchingError,
  isValidFullListSortOption,
  notFound,
  resolveGuideName,
} from 'src/utils';
import {
  FullGuideSortField,
  GetAppearancesAllResult,
  GuideName,
  Nullable,
  Optional,
} from 'src/types';
import { wrapper } from 'src/store';
import { useAuth, useFullGuide, useTitleSetter } from 'src/hooks';
import { colorGuide } from 'src/strings';
import { GuideNotFound } from 'src/components/colorguide/GuideNotFound';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import Link from 'next/link';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import MajorChangesButton from 'src/components/colorguide/MajorChangesButton';
import StatusAlert from 'src/components/shared/StatusAlert';
import FullGuideGroups from 'src/components/colorguide/FullGuideGroups';
import { fullGuideFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { useDispatch } from 'react-redux';
import { PATHS } from 'src/paths';
import ReturnToGuideButton from 'src/components/colorguide/ReturnToGuideButton';

interface PropTypes {
  guide: Nullable<GuideName>;
  sort: FullGuideSortField;
  initialData: Nullable<GetAppearancesAllResult>;
}

const titleFactory: TitleFactory<Pick<PropTypes, 'guide'>> = ({ guide }) => {
  const title = getFullGuideTitle(guide);
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

const FullGuidePage: NextPage<PropTypes> = ({ guide, sort, initialData }) => {
  const dispatch = useDispatch();
  const { isStaff } = useAuth();
  const data = useFullGuide({ guide, sort }, initialData || undefined);
  const heading = getFullGuideHeading(guide);

  const titleData = useMemo(() => titleFactory({ guide }), [guide]);
  useTitleSetter(dispatch, titleData);

  if (guide === null) {
    return <GuideNotFound heading={heading} />;
  }

  const sortMethod = fullListSortOptionsMap[sort];
  const sortOptions = Object.keys(fullListSortOptionsMap) as FullGuideSortField[];
  return (
    <Content>
      <StandardHeading
        heading={heading}
        lead={(
          <UncontrolledDropdown>
            Sorted <DropdownToggle color="white" className="font-italic">{sortMethod}<InlineIcon icon="caret-down" last /></DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Sort by</DropdownItem>
              {sortOptions.map(sortBy => (
                <Link key={sortBy} href={PATHS.GUIDE_FULL(guide, { sort_by: sortBy })} passHref>
                  <DropdownItem tag="a" active={sortBy === sort}>{fullListSortOptionsMap[sortBy]}</DropdownItem>
                </Link>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      />
      <ButtonCollection>
        <ReturnToGuideButton guide={guide} />
        {isStaff && (
          <Button color="ui" size="sm" disabled>
            <InlineIcon icon="sort" first />
            Re-order
          </Button>
        )}
        <MajorChangesButton guide={guide} />
      </ButtonCollection>

      <StatusAlert status={data.status} noun="list of all entries" />
      {typeof data.appearances !== 'undefined' && typeof data.groups !== 'undefined' && (
        <FullGuideGroups appearances={data.appearances} groups={data.groups} />
      )}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    return notFound(ctx);
  }

  const sort: FullGuideSortField = isValidFullListSortOption(query.sort_by) ? query.sort_by : 'relevance';

  let initialData: Optional<GetAppearancesAllResult>;
  if (guide) {
    try {
      initialData = await fullGuideFetcher({ guide, sort })();
    } catch (e) {
      handleDataFetchingError(ctx, e);
    }
  }

  const props: PropTypes = {
    guide,
    sort,
    initialData: initialData || null,
  };
  titleSetter(store, titleFactory(props));
  return { props };
});

export default FullGuidePage;
