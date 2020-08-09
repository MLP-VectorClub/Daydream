import React from 'react';
import Link from 'next/link';
import Content from '../../components/shared/Content';
import { CLUB_URL, GITHUB_URL } from '../../config';
import { Trans, useTranslation } from '../../i18n';
import ExternalLink from '../../components/shared/ExternalLink';
import DeviantLink from '../../components/shared/DeviantLink';
import FavMe from '../../components/shared/FavMe';
import { coreActions } from '../../store/slices';
import { AppPageContext, wrapper } from '../../store';
import StandardHeading from '../../components/shared/StandardHeading';
import { PATHS } from '../../utils';

export const getStaticProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx as typeof ctx & AppPageContext;
  store.dispatch(coreActions.setTitle('about'));
  return {
    props: {
      namespacesRequired: ['about'],
    },
  };
});

const AboutPage: React.FC = () => {
  const { t } = useTranslation('about');
  return (
    <Content>
      <img src="/img/logo.svg" alt="MLP Vector Club Website Logo" id="about-logo" />
      <StandardHeading
        heading={(
          <Trans t={t} i18nKey="website">
            <ExternalLink href={CLUB_URL}>0</ExternalLink>
            1
          </Trans>
        )}
        lead={t('tagline')}
      />
      <section className="what-s-this-site-">
        <h2 id="what-s-this-site-">
          {t('whatsThisSite.title')}
        </h2>
        <p>{t('whatsThisSite.p1')}</p>
        <p>{t('whatsThisSite.p2')}</p>
      </section>
      <section className="attributions">
        <h2>Attributions</h2>
        <p>
          <Trans t={t} i18nKey="attributions.github">
            0<a href={`${GITHUB_URL}#attributions`}>1</a>2
          </Trans>
        </p>
        <p>
          <Link href={PATHS.BLENDING}>
            <a>{t('attributions.blendingCalc.0')}</a>
          </Link>
          {t('attributions.blendingCalc.1')}
          <ExternalLink href="https://github.com/dasprid">
            {t('attributions.blendingCalc.2')}
          </ExternalLink>
          <br />

          <strong>{`${t('attributions.headingFont')}: `}</strong>
          <ExternalLink href="http://www.mattyhex.net/CMR/">Celestia Medium Redux</ExternalLink>
          <br />

          <strong>{t('attributions.daLogo')}</strong>
          {' © '}
          <ExternalLink href="https://www.deviantart.com/">DeviantArt</ExternalLink>
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Adobe_Illustrator_CC_icon.svg">
            <strong>{t('attributions.aiLogo')}</strong>
          </ExternalLink>
          {' © Adobe Systems Inc.'}
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Inkscape_Logo.svg">
            <strong>{t('attributions.inkscapeLogo')}</strong>
          </ExternalLink>
          {` © ${t('attributions.inkscapeTeam')}`}
          <br />

          <ExternalLink href="https://www.deviantart.com/flutterguy317/art/Ponyscape-PNG-354658716">
            <strong>{t('attributions.ponyscapeLogo')}</strong>
          </ExternalLink>
          {' © '}
          <DeviantLink username="flutterguy317" />
          <br />

          <Trans t={t} i18nKey="attributions.appLogo">
            <strong>0</strong>
            1
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
            {/* TODO See if i18n will pass children with <14 /> */}
            <DeviantLink username="Ambassad0r" />
            15
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.extLink">
            <strong>0</strong>
            1
            <ExternalLink href="https://commons.wikimedia.org/wiki/File:Icon_External_Link.svg">2</ExternalLink>
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.loadingIcons">
            <strong>0</strong>
            1
            <ExternalLink href="https://loading.io/">2</ExternalLink>
            3
          </Trans>
          <br />

          <strong>{t('attributions.browserLogos.about.0')}</strong>
          {t('attributions.browserLogos.about.1')}
          <Link href="/browser">
            <a>{t('attributions.browserLogos.about.2')}</a>
          </Link>
          {t('attributions.browserLogos.about.3')}
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.edge">
              <FavMe id="d9rtlbv" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d8uhefy" />
              5
              <DeviantLink username="furrgroup" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.firefox">
              <FavMe id="d4b6f4v" />
              1
              <DeviantLink username="NoReasonToHope" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.chrome">
              <FavMe id="d523s3y" />
              1
              <DeviantLink username="he4rtofcourage" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.ie">
              <FavMe id="d52fp08" />
              1
              <DeviantLink username="McSadat" />
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.opera">
              <FavMe id="dacngnh" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d52qnaw" />
              5
              <DeviantLink username="ParallaxMLP" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.safari">
              <FavMe id="dadu3l9" />
              1
              <DeviantLink username="masemj" />
              3
              <FavMe id="d530knp" />
              5
              <DeviantLink username="ParallaxMLP" />
              7
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.vivaldi">
              0
              <ExternalLink href="https://vivaldi.com/press/">1</ExternalLink>
            </Trans>
          </li>
          <li>
            <Trans t={t} i18nKey="attributions.browserLogos.etc">
              0
              <ExternalLink href="https://github.com/alrra/browser-logos/">1</ExternalLink>
            </Trans>
          </li>
        </ul>
        <p>
          {/* TODO Extract msg into translations */}
          <Trans t={t} i18nKey="attributions.synopsis">
            <strong>0</strong>
            1
            <ExternalLink href="https://www.themoviedb.org/documentation/api">2</ExternalLink>
            3
            {{ msg: t('common:tmdb_disclaimer') }}
          </Trans>
          <br />

          <Trans t={t} i18nKey="attributions.developer">
            <strong>0</strong>
            1
            <ExternalLink href="https://github.com/SeinopSys">2</ExternalLink>
          </Trans>
        </p>
      </section>
      <section id="supported-providers">
        <h2>{t('providers.title')}</h2>
        <div>
          <p>{t('providers.p1')}</p>
          <ul>
            <li><a href="https://sta.sh/">Sta.sh</a>*</li>
            <li><a href="https://deviantart.com/">DeviantArt</a>*</li>
            <li><a href="https://imgur.com/">Imgur</a></li>
            <li><a href="https://derpibooru.org/">Derpibooru</a></li>
            <li><a href="https://app.prntscr.com/">LightShot</a></li>
          </ul>
          <p>{`* ${t('providers.asterisk')}`}</p>
        </div>
      </section>
      <section>
        <h2>{t('atSign.title')}</h2>
        <div>
          <p>
            <Trans t={t} i18nKey="atSign.p1">
              0
              <ExternalLink href={GITHUB_URL}>1</ExternalLink>
              2
            </Trans>
          </p>
        </div>
      </section>
    </Content>
  );
};

export default AboutPage;
