import { FC, ReactNode, useMemo, VoidFunctionComponent } from 'react';
import Link from 'next/link';
import {
  BACKEND_GITHUB_URL,
  BACKEND_PROJECT_NAME,
  DEVIANTART_GROUP_NAME,
  DEVIANTART_GROUP_URL,
  GITHUB_URL,
  PROJECT_NAME,
} from 'src/config';
import { wrapper } from 'src/store';
import { getGuideLabel } from 'src/utils';
import Content from 'src/components/shared/Content';
import ExternalLink from 'src/components/shared/ExternalLink';
import DeviantLink from 'src/components/shared/DeviantLink';
import FavMe, { FavMeProps } from 'src/components/shared/FavMe';
import StandardHeading from 'src/components/shared/StandardHeading';
import Image from 'next/image';
import InlineIcon from 'src/components/shared/InlineIcon';
import { useTitleSetter } from 'src/hooks';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { PATHS } from 'src/paths';
import { Translatable } from 'src/types';
import { Trans, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

const AppPageLink: FC<{ href: string }> = ({ children, href }) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);

const ChildfreeFavme: VoidFunctionComponent<FavMeProps & { content: ReactNode }> = ({ content, ...props }) => (
  <FavMe {...props}>{content}</FavMe>
);

const titleFactory: TitleFactory = () => {
  const title: Translatable = ['common:titles.about'];
  return {
    title,
    breadcrumbs: [{ label: title, active: true }],
  };
};

// TODO Eliminate all remaining hard-coded copy text

const AboutPage: NextPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);

  const heading = (
    <Trans t={t} i18nKey="about:website" values={{ linkText: DEVIANTART_GROUP_NAME }}>
      <ExternalLink href={DEVIANTART_GROUP_URL}>0</ExternalLink>1
    </Trans>
  );

  return (
    <Content>
      <div className="d-flex justify-content-center">
        <Image src="/img/logo.svg" alt="MLP Vector Club Website Logo" id="about-logo" width={200} height={200} priority unoptimized />
      </div>
      <StandardHeading heading={heading} lead={t('about:tagline')} />
      <section className="what-s-this-site-">
        <h2 id="what-s-this-site-">{t('about:whatsThisSite.title')}</h2>
        <p>{t('about:whatsThisSite.p1')}</p>
        <p>{t('about:whatsThisSite.p2')}</p>
      </section>
      <section className="attributions">
        <h2>{t('about:attributions.title')}</h2>
        <p>
          <Trans t={t} i18nKey="about:attributions.github">
            0<a href={`${GITHUB_URL}#attributions`}>GitHub page</a>1
          </Trans>
        </p>
        <p>
          <Trans t={t} i18nKey="about:attributions.blendingCalc">
            <AppPageLink href={PATHS.BLENDING}>0</AppPageLink>1<ExternalLink href="https://github.com/dasprid">2</ExternalLink>
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.headingFont" values={{ linkText: 'Celestia Medium Redux' }}>
            <strong>0</strong>
            <ExternalLink href="http://www.mattyhex.net/CMR/">1</ExternalLink>
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.daLogo" values={{ copyright: 'DeviantArt' }}>
            <strong>0</strong>1<ExternalLink href="https://www.deviantart.com/">2</ExternalLink>
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.aiLogo" values={{ copyright: 'Adobe Systems Inc.' }}>
            <ExternalLink href="https://commons.wikimedia.org/wiki/File:Adobe_Illustrator_CC_icon.svg">0</ExternalLink>1
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.inkscapeLogo">
            <ExternalLink href="https://commons.wikimedia.org/wiki/File:Inkscape_Logo.svg">0</ExternalLink>1
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.ponyscapeLogo">
            <ExternalLink href="https://www.deviantart.com/flutterguy317/art/Ponyscape-PNG-354658716">0</ExternalLink>
            1
            <DeviantLink username="flutterguy317" />
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.applicationLogo">
            <strong>0</strong>1
            <a href="https://www.deviantart.com/pirill-poveniy/art/Collab-Christmas-Vector-of-the-MLP-VC-Mascot-503196118">2</a>
            3
            <DeviantLink username="Pirill-Poveniy" />
            5
            <DeviantLink username="thediscorded" />
            7
            <DeviantLink username="masemj" />
            9
            <DeviantLink username="Ambassad0r" />
            11
            <a href="https://www.deviantart.com/ambassad0r/art/Penny-Curve-MLP-VectorClub-Mascot-2-0-568079382">12</a>
            13
            <DeviantLink username="Ambassad0r" />
            15
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.logoVectors.general" values={{ copyright: 'Hasbro Studios, LLC.' }}>
            <strong>0</strong>1
          </Trans>
          <ul>
            <li>
              <Trans t={t} i18nKey="about:attributions.logoVectors.specific">
                <ChildfreeFavme id="db60g3n" content={getGuideLabel('pony')} />
                1
                <DeviantLink username="drakizora" />
              </Trans>
            </li>
            <li>
              <Trans t={t} i18nKey="about:attributions.logoVectors.specific">
                <ChildfreeFavme id="d6923sw" content={getGuideLabel('eqg')} />
                1
                <DeviantLink username="Charleston-and-itchy" />
              </Trans>
            </li>
            <li>
              <Trans t={t} i18nKey="about:attributions.logoVectors.specific">
                <ChildfreeFavme id="ddztpnc" content={getGuideLabel('pl')} />
                1
                <DeviantLink username="illumnious" />
              </Trans>
            </li>
          </ul>

          <Trans t={t} i18nKey="about:attributions.uiIcons" values={{ linkText: 'FontAwesome Free' }}>
            <strong>0</strong>1<a href="https://fontawesome.com/license">2</a>
          </Trans>
          <br />

          <Trans t={t} i18nKey="about:attributions.browserLogos.general" values={{ linkText: 'FontAwesome Free' }}>
            <strong>0</strong>1<AppPageLink href={PATHS.ABOUT_CONNECTION}>2</AppPageLink>3
          </Trans>
          <br />
        </p>
        <ul>
          <li>
            <FavMe id="d9rtlbv">Edge</FavMe>
            {' by '}
            <DeviantLink username="masemj" />
            {' ('}
            <FavMe id="d8uhefy">designed</FavMe>
            {' by '}
            <DeviantLink username="furrgroup" />)
          </li>
          <li>
            <FavMe id="d4b6f4v">Firefox</FavMe>
            {' by '}
            <DeviantLink username="NoReasonToHope" />
          </li>
          <li>
            <FavMe id="d523s3y">Google Chrome</FavMe>
            {' by '}
            <DeviantLink username="he4rtofcourage" />
          </li>
          <li>
            <FavMe id="d52fp08">Internet Explorer</FavMe>
            {' by '}
            <DeviantLink username="McSadat" />
          </li>
          <li>
            <FavMe id="dacngnh">Opera</FavMe>
            {' by '}
            <DeviantLink username="masemj" />
            {' ('}
            <FavMe id="d52qnaw">designed</FavMe>
            {' by '}
            <DeviantLink username="ParallaxMLP" />)
          </li>
          <li>
            <FavMe id="dadu3l9">Safari</FavMe>
            {' by '}
            <DeviantLink username="masemj" />
            {' ('}
            <FavMe id="d530knp">designed</FavMe>
            {' by '}
            <DeviantLink username="ParallaxMLP" />)
          </li>
          <li>
            Vivaldi from <ExternalLink href="https://vivaldi.com/press/">Vivaldi Press Kit</ExternalLink>
          </li>
          <li>
            Other logos not mentioned previously were found on{' '}
            <ExternalLink href="https://github.com/alrra/browser-logos/">alrra/browser-logos</ExternalLink>
          </li>
        </ul>
        <p>
          <strong>Episode synopsis data</strong>
          {' is provided by '}
          <ExternalLink href="https://www.themoviedb.org/documentation/api">The Movie Database API</ExternalLink>
          {`. ${t('common:tmdbDisclaimer')}`}
          <br />
          <strong>Coding, design & hosting:</strong> <ExternalLink href="https://github.com/SeinopSys">SeinopSys</ExternalLink>
        </p>
      </section>
      <section id="supported-providers">
        <h2>{t('about:providers.title')}</h2>
        <div>
          <p>{t('about:providers.p1')}</p>
          <ul>
            <li>
              <a href="https://sta.sh/">Sta.sh</a>*
            </li>
            <li>
              <a href="https://deviantart.com/">DeviantArt</a>*
            </li>
            <li>
              <a href="https://imgur.com/">Imgur</a>
            </li>
            <li>
              <a href="https://derpibooru.org/">Derpibooru</a>
            </li>
            <li>
              <a href="https://app.prntscr.com/">LightShot</a>
            </li>
          </ul>
          <p>{t('about:providers.asterisk')}</p>
        </div>
      </section>
      <section>
        <h2>{t('about:openSource.title')}</h2>
        <div>
          <p>{t('about:openSource.p1')}</p>
          <ul>
            <li>
              Frontend: <ExternalLink href={GITHUB_URL}>{PROJECT_NAME}</ExternalLink>
            </li>
            <li>
              Backend: <ExternalLink href={BACKEND_GITHUB_URL}>{BACKEND_PROJECT_NAME}</ExternalLink>
            </li>
          </ul>
          <p>
            <Trans t={t} i18nKey="about:openSource.p2">
              0
              <InlineIcon icon="chevron-right" fixedWidth />2
            </Trans>
          </p>
        </div>
      </section>
    </Content>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  titleSetter(store, titleFactory());
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['about'])),
    },
  };
});

export default AboutPage;
