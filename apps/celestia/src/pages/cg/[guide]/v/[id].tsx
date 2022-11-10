import { NextPage } from 'next';
import StandardHeading from 'src/components/shared/StandardHeading';
import { useAppDispatch, wrapper } from 'src/store';
import { assembleSeoUrl, getAppearanceTitle, getGuideLabel, handleDataFetchingError, notFound, resolveGuideName } from 'src/utils';
import { BreadcrumbEntry, Nullable, Optional } from 'src/types';
import { DetailedAppearance, GetAppearancesIdResult, GuideName } from '@mlp-vectorclub/api-types';
import { titleSetter } from 'src/utils/core';
import Content from 'src/components/shared/Content';
import { TitleFactory } from 'src/types/title';
import { PATHS } from 'src/paths';
import { appearanceFetcher } from 'src/fetchers';
import { useAuth, useDetailedAppearance, useTitleSetter } from 'src/hooks';
import StatusAlert from 'src/components/shared/StatusAlert';
import SpriteImage from 'src/components/colorguide/SpriteImage';
import { GuideNotFound } from 'src/components/colorguide/GuideNotFound';
import { GuideLink } from 'src/components/colorguide/GuideLink';
import styles from 'modules/AppearancePage.module.scss';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { NextSeoProps } from 'next-seo/lib/types';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import { Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { ShareAppearanceButton } from 'src/components/colorguide/ShareAppearanceButton';
import AppearanceTags from 'src/components/colorguide/AppearanceTags';
import pluralize from 'pluralize';
import { AppearanceCutieMarks } from 'src/components/colorguide/AppearanceCutieMarks';
import { FeaturePlaceholder } from 'src/components/shared/FeaturePlaceholder';
import { AppearanceColorGroups } from 'src/components/colorguide/AppearanceColorGroups';
import { AppearanceNotes } from 'src/components/colorguide/AppearanceNotes';
import { SSRConfig } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  guide: GuideName;
  id: number | null;
  initialData: {
    appearance: Nullable<DetailedAppearance>;
  };
}

const titleFactory: TitleFactory<Pick<PropTypes, 'guide' | 'initialData'>> = ({ guide, initialData }) => {
  const title = getAppearanceTitle(guide, initialData.appearance);
  const guideItem =
    guide !== null
      ? {
          label: getGuideLabel(guide),
          linkProps: { href: PATHS.GUIDE(guide) },
        }
      : { label: getGuideLabel(guide) };
  const breadcrumbs: BreadcrumbEntry[] = [
    {
      linkProps: { href: PATHS.GUIDE_INDEX },
      label: ['colorGuide:index.breadcrumb'],
    },
    guideItem,
  ];
  if (initialData.appearance) {
    breadcrumbs.push({ label: initialData.appearance.label, active: true });
  } else {
    breadcrumbs.push({ label: 'Appearance', active: true });
  }
  return {
    title,
    breadcrumbs,
  };
};

const AppearancePage: NextPage<PropTypes> = ({ guide, id, initialData }) => {
  const { isStaff } = useAuth();
  const { appearance, status } = useDetailedAppearance({ id }, initialData.appearance || undefined);
  const dispatch = useAppDispatch();
  const titleData = useMemo(() => titleFactory({ initialData, guide }), [guide, initialData]);
  useTitleSetter(dispatch, titleData);

  const seoData = useMemo<NextSeoProps | null>(
    () =>
      appearance
        ? {
            description: `Show accurate colors for "${appearance.label}" from the MLP-VectorClub's Official Color Guide`,
            canonical: assembleSeoUrl(PATHS.APPEARANCE(appearance)),
            openGraph: appearance.sprite
              ? {
                  images: [
                    {
                      width: 600,
                      height: 600,
                      url: appearance.sprite.path,
                    },
                  ],
                }
              : undefined,
          }
        : null,
    [appearance]
  );
  const shortUrl = useMemo(() => appearance && assembleSeoUrl(PATHS.SHORT_APPEARANCE(appearance)), [appearance]);

  if (!appearance) {
    return <GuideNotFound heading="Unknown appearance" noun="appearance" />;
  }

  return (
    <Content>
      {seoData && <NextSeo {...seoData} />}
      {appearance.sprite && (
        <div className={styles.spriteImage}>
          <SpriteImage sprite={appearance.sprite} height={300} />
        </div>
      )}
      <StandardHeading
        heading={appearance.label}
        lead={
          <>
            from the <GuideLink name={appearance.guide} title />
          </>
        }
      />
      <ButtonCollection>
        <Button color="link" size="sm" disabled>
          <InlineIcon icon="image" first />
          View as PNG
        </Button>
        <Button color="primary" size="sm" disabled>
          <InlineIcon icon="paint-brush" first />
          Download swatch file
        </Button>
        {shortUrl && <ShareAppearanceButton shortUrl={shortUrl} />}
        {isStaff && (
          <>
            <Button color="ui" size="sm" disabled>
              <InlineIcon icon="pencil-alt" first />
              Edit metadata
            </Button>
            <Button color="danger" size="sm" disabled>
              <InlineIcon icon="trash" first />
              Delete appearance
            </Button>
          </>
        )}
      </ButtonCollection>

      <StatusAlert status={status} subject="appearance" />

      <AppearanceTags tags={appearance.tags} guide={appearance.guide} />
      <h2>
        <InlineIcon icon="video" first size="xs" />
        Featured in
      </h2>
      <FeaturePlaceholder />
      <AppearanceNotes notes={appearance.notes} />
      <AppearanceCutieMarks label={appearance.label} cutieMarks={appearance.cutieMarks} colorGroups={appearance.colorGroups} />
      <AppearanceColorGroups colorGroups={appearance.colorGroups} />
      <h2>{pluralize('Related appearances', appearance.colorGroups.length)}</h2>
      <FeaturePlaceholder />
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>((store) => async (ctx) => {
  const { query, req, locale } = ctx;

  const guide = resolveGuideName(query.guide) || null;
  if (!guide) {
    return notFound(ctx);
  }

  let id: number | null = null;
  if (typeof query.id === 'string') {
    id = Number.parseInt(query.id.trim(), 10);
  }

  let appearance: Optional<GetAppearancesIdResult>;
  if (guide && id !== null) {
    try {
      appearance = await appearanceFetcher({ id }, req)();
    } catch (e) {
      handleDataFetchingError(ctx, e);
    }
  }

  const props: PropTypes = {
    guide,
    id,
    initialData: {
      appearance: appearance || null,
    },
  };
  titleSetter(store, titleFactory(props));
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['colorGuide'])),
      ...props,
    },
  };
});

export default AppearancePage;
