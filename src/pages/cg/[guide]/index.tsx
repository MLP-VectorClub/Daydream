import { Button } from 'reactstrap';
import React, { useMemo } from 'react';
import { AxiosError } from 'axios';
import { GetAppearancesResult, GuideName, Nullable, Optional } from 'src/types';
import {
  getGuideLabel,
  getGuideTitle,
  notFound,
  PATHS,
  resolveGuideName,
  setResponseStatus,
} from 'src/utils';
import { AppDispatch, wrapper } from 'src/store';
import { useAuth, useGuide, usePrefs, useTitleSetter } from 'src/hooks';
import AppearanceItem from 'src/components/colorguide/AppearanceItem';
import Pagination from 'src/components/shared/Pagination';
import Content from 'src/components/shared/Content';
import { NextPage } from 'next';
import { colorGuide } from 'src/strings';
import StandardHeading from 'src/components/shared/StandardHeading';
import ContactLink from 'src/components/shared/ContactLink';
import ExternalLink from 'src/components/shared/ExternalLink';
import Link from 'next/link';
import GuideNotFound from 'src/components/colorguide/GuideNotFound';
import InlineIcon from 'src/components/shared/InlineIcon';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import MajorChangesButton from 'src/components/colorguide/MajorChangesButton';
import StatusAlert from 'src/components/shared/StatusAlert';
import { guideFetcher } from 'src/fetchers';
import { useDispatch } from 'react-redux';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import NoResultsAlert from 'src/components/shared/NoResultsAlert';

const titleFactory: TitleFactory<Pick<PropTypes, 'guide' | 'page'>> = ({ guide, page }) => {
  const title = getGuideTitle(guide, page);
  return {
    title,
    breadcrumbs: [
      { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
      { label: getGuideLabel(guide), active: true },
    ],
  };
};

interface PropTypes {
  guide: Nullable<GuideName>;
  page: number;
  initialData: Nullable<GetAppearancesResult>;
}

const ColorGuidePage: NextPage<PropTypes> = ({ guide, page, initialData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isStaff, signedIn } = useAuth();
  const prefs = usePrefs(signedIn);
  const size = prefs?.cg_itemsperpage || initialData?.pagination.itemsPerPage;
  const data = useGuide({ guide, page, size }, initialData || undefined);
  const heading = getGuideTitle(guide);

  const titleData = useMemo(() => titleFactory({ guide, page }), [guide, page]);
  useTitleSetter(dispatch, titleData);

  if (guide === null) {
    return <GuideNotFound heading={heading} />;
  }

  const lead = `A searchable list of character colors from the ${guide === 'eqg' ? 'movies' : 'series'}`;

  return (
    <Content>
      <StandardHeading heading={heading} lead={lead} />
      <p className="text-center">
        We add characters based on demand, please <ContactLink>let us know</ContactLink> if you'd like us to make a guide for a character.
        <br />
        <small>
          Alternatively, use the old color guides:{' '}
          <ExternalLink href="https://sta.sh/0kic0ngp3fy">Pony</ExternalLink>
          {' / '}
          <ExternalLink href="http://fav.me/d7120l1">EQG</ExternalLink>
        </small>
        <br />
        Can't find links that were here previously? Some links were moved to the <Link href={PATHS.GUIDE_INDEX}><a>guide list</a></Link>.
      </p>
      <ButtonCollection>
        {isStaff && (
          <Button color="success" size="sm" disabled>
            <InlineIcon icon="plus" first />
            Add new {guide === 'eqg' ? 'Character' : 'Pony'}
          </Button>
        )}
        <Link href={PATHS.GUIDE_FULL(guide)} passHref>
          <Button color="link" size="sm">
            <InlineIcon icon="bars" first />
            Full List
          </Button>
        </Link>
        <MajorChangesButton guide={guide} />
      </ButtonCollection>
      <StatusAlert status={data.status} noun="color guide entries" />
      {data.appearances?.length === 0 && (
        <NoResultsAlert message="There are no entries in this guide yet" />
      )}
      {data.pagination && <Pagination {...data.pagination} tooltipPos="bottom" />}
      {data.appearances && data.appearances.map(el => (
        <AppearanceItem key={el.id} appearance={el} />
      ))}
      {data.pagination && <Pagination {...data.pagination} tooltipPos="top" listClassName="mb-0" />}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store, req } = ctx;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    notFound(ctx);
  }

  let page = 1;
  if (typeof query.page === 'string') {
    page = parseInt(query.page, 10);
  }

  let initialData: Optional<GetAppearancesResult>;
  if (guide) {
    try {
      initialData = await guideFetcher({ ...query, guide, page }, req)();
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

  const props: PropTypes = {
    guide,
    page,
    initialData: initialData || null,
  };
  titleSetter(store, titleFactory(props));
  return { props };
});

export default ColorGuidePage;
