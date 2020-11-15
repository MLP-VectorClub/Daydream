import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import React from 'react';
import StandardHeading from 'src/components/shared/StandardHeading';
import {
  fullListSortOptionsMap,
  getFullGuideHeading,
  getFullGuideTitle,
  getGuideLabel,
  isValidFullListSortOption,
  notFound,
  PATHS,
  resolveGuideName,
  setResponseStatus,
} from 'src/utils';
import {
  FullGuideSortField,
  GetAppearancesAllResult,
  GuideName,
  Nullable,
  Optional,
} from 'src/types';
import { wrapper } from 'src/store';
import { fullGuideFetcher, useAuth, useFullGuide } from 'src/hooks';
import { AxiosError } from 'axios';
import { coreActions } from 'src/store/slices';
import { colorGuide } from 'src/strings';
import GuideNotFound from 'src/components/colorguide/GuideNotFound';
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

interface PropTypes {
  guide: Nullable<GuideName>;
  sort: FullGuideSortField;
  initialData: Nullable<GetAppearancesAllResult>;
}

const FullGuidePage: NextPage<PropTypes> = ({ guide, sort, initialData }) => {
  const { isStaff } = useAuth();
  const data = useFullGuide({ guide, sort }, initialData || undefined);
  const heading = getFullGuideHeading(guide);
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
        <Link href={PATHS.GUIDE(guide)} passHref>
          <Button color="link" size="sm">
            <InlineIcon icon="arrow-circle-left" first />
            Return to Guide
          </Button>
        </Link>
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
    notFound(ctx);
  }

  const sort: FullGuideSortField = isValidFullListSortOption(query.sort_by) ? query.sort_by : 'relevance';

  let initialData: Optional<GetAppearancesAllResult>;
  if (guide) {
    try {
      initialData = await fullGuideFetcher({ guide, sort })();
    } catch (e) {
      if ('response' in e) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(response);
        }
      } else {
        console.error(e);
      }
    }
  }

  const title = getFullGuideTitle(guide);
  store.dispatch(coreActions.setTitle(title));
  const guideLinkProps = guide ? { href: PATHS.GUIDE(guide) } : undefined;
  store.dispatch(coreActions.setBreadcrumbs([
    { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
    { linkProps: guideLinkProps, label: getGuideLabel(guide) },
    { label: getGuideLabel(guide), active: true },
  ]));
  return {
    props: {
      guide,
      sort,
      initialData: initialData || null,
    },
  };
});

export default FullGuidePage;
