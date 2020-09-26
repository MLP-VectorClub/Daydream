import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { Trans, useTranslation } from 'src/i18n';
import { API_DOCS_URL, GUIDE_NAMES } from 'src/config';
import ExternalLink from 'src/components/shared/ExternalLink';
import { PATHS } from 'src/utils';
import Link from 'next/link';
import { GetColorGuidesResult, GuideName, WithI18nNamespaces } from 'src/types';
import { guideIndexDataFetcher, useGuideIndexData } from 'src/hooks';
import { coreActions } from 'src/store/slices';
import { AppPageContext, wrapper } from 'src/store';

interface PropTypes extends WithI18nNamespaces {
  initialData: GetColorGuidesResult;
}

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx as typeof ctx & AppPageContext;
  let initialData: GetColorGuidesResult = {
    entryCounts: GUIDE_NAMES.reduce((acc, c) => ({ ...acc, [c]: 0 }), {} as Record<GuideName, number>),
  };

  try {
    initialData = await guideIndexDataFetcher();
  } catch (e) {
    /* ignore */
  }

  store.dispatch(coreActions.setTitle('colorGuideList'));

  return {
    props: { initialData },
  };
});

const GuideIndexPage: React.FC<PropTypes> = ({ initialData }) => {
  const { t } = useTranslation('color-guide');
  const data = useGuideIndexData(initialData);
  return (
    <Content>
      <StandardHeading heading={t('common:titles.colorGuideList')} lead={t('index.lead')} />
      <p className="text-center">
        <Trans t={t} i18nKey="index.developerRes">
          0
          <ExternalLink href={API_DOCS_URL}>1</ExternalLink>
          2
        </Trans>
      </p>

      <div id="guide-list">
        {GUIDE_NAMES.map(code => {
          const logoPath = `/img/logos/${code}.svg`;
          const guideName = t(`guideName.${code}`);
          return (
            <Link key={code} href={PATHS.GUIDE()} as={PATHS.GUIDE(code)}>
              <a>
                <figure>
                  <img
                    src="/img/blank-pixel.png"
                    className="guide-icon"
                    alt={`${guideName} logo`}
                    style={{ backgroundImage: `url(${logoPath})` }}
                  />
                  <figcaption>
                    <span className="guide-name">{guideName}</span>
                    <span className="guide-count">{t('index.entry', { count: data?.entryCounts[code] })}</span>
                  </figcaption>
                </figure>
              </a>
            </Link>
          );
        })}
      </div>
    </Content>
  );
};

GuideIndexPage.defaultProps = {
  i18nNamespaces: ['color-guide'],
};

export default GuideIndexPage;
