import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import { useCallback, useMemo, VoidFunctionComponent } from 'react';
import StandardHeading from 'src/components/shared/StandardHeading';
import {
  fullListSortOptionsMap,
  getGuideLabel,
  handleDataFetchingError,
  isValidFullListSortOption,
  notFound,
  resolveGuideName,
} from 'src/utils';
import { Nullable, Optional, Translatable } from 'src/types';
import { FullGuideSortField, GetAppearancesAllResult, GuideName } from '@mlp-vectorclub/api-types';
import { useAppDispatch, wrapper } from 'src/store';
import { useAuth, useFullGuide, useTitleSetter } from 'src/hooks';
import { GuideNotFound } from 'src/components/colorguide/GuideNotFound';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import Link from 'next/link';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import MajorChangesButton from 'src/components/colorguide/MajorChangesButton';
import StatusAlert from 'src/components/shared/StatusAlert';
import FullGuideGroups from 'src/components/colorguide/FullGuideGroups';
import { fullGuideFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { PATHS } from 'src/paths';
import ReturnToGuideButton from 'src/components/colorguide/ReturnToGuideButton';
import { SSRConfig, Trans, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  guide: Nullable<GuideName>;
  sort: FullGuideSortField;
  initialData: Nullable<GetAppearancesAllResult>;
}

const titleFactory: TitleFactory<Pick<PropTypes, 'guide'>> = ({ guide }) => {
  const title: Translatable = ['colorGuide:fullList.title', { replace: { guideName: getGuideLabel(guide) } }];
  const guideLinkProps = guide ? { href: PATHS.GUIDE(guide) } : undefined;
  return {
    title,
    breadcrumbs: [
      {
        linkProps: { href: PATHS.GUIDE_INDEX },
        label: ['colorGuide:index.breadcrumb'],
      },
      { linkProps: guideLinkProps, label: getGuideLabel(guide) },
      { label: 'Full List', active: true },
    ],
  };
};

const FullGuidePage: NextPage<PropTypes> = ({ guide, sort, initialData }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isStaff } = useAuth();
  const data = useFullGuide({ guide, sort }, initialData || undefined);
  const heading = t('colorGuide:fullList.heading', {
    guideName: getGuideLabel(guide),
  });

  const titleData = useMemo(() => titleFactory({ guide }), [guide]);
  useTitleSetter(dispatch, titleData);

  const SortDropdown: VoidFunctionComponent<{ sortI18n: FullGuideSortField }> = useCallback(
    ({ sortI18n }) => (
      <DropdownToggle color="white" className="font-italic">
        {t(`colorGuide:fullList.sortOptions.${sortI18n}`)}
        <InlineIcon icon="caret-down" last />
      </DropdownToggle>
    ),
    [t]
  );

  if (guide === null) {
    return <GuideNotFound heading={heading} />;
  }

  const sortOptions = Object.keys(fullListSortOptionsMap) as Array<keyof typeof fullListSortOptionsMap>;

  return (
    <Content>
      <StandardHeading
        heading={heading}
        lead={
          <UncontrolledDropdown>
            <Trans t={t} i18nKey="colorGuide:fullList.lead">
              0
              <SortDropdown sortI18n={sort} />
            </Trans>
            <DropdownMenu>
              <DropdownItem header>{t('colorGuide:fullList.sortOptionsHeader')}</DropdownItem>
              {sortOptions.map((sortBy) => (
                <Link
                  key={sortBy}
                  href={PATHS.GUIDE_FULL(guide, { sort_by: sortBy })}
                  passHref
                  legacyBehavior>
                  <DropdownItem tag="a" active={sortBy === sort}>
                    {t(`colorGuide:fullList.sortOptions.${sortBy}`)}
                  </DropdownItem>
                </Link>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        }
      />
      <ButtonCollection>
        <ReturnToGuideButton guide={guide} />
        {isStaff && (
          <Button color="ui" size="sm" disabled>
            <InlineIcon icon="sort" first />
            {t('colorGuide:fullList.reorder')}
          </Button>
        )}
        <MajorChangesButton guide={guide} />
      </ButtonCollection>

      <StatusAlert status={data.status} subject="list of all entries" />
      {typeof data.appearances !== 'undefined' && typeof data.groups !== 'undefined' && (
        <FullGuideGroups appearances={data.appearances} groups={data.groups} />
      )}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>((store) => async (ctx) => {
  const { query, locale } = ctx;

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
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['colorGuide'])),
      ...props,
    },
  };
});

export default FullGuidePage;
