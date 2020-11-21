import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  BACKEND_GITHUB_URL,
  BACKEND_PROJECT_NAME,
  CLUB_URL,
  GITHUB_URL,
  PROJECT_NAME,
} from 'src/config';
import { wrapper } from 'src/store';
import { getGuideLabel, PATHS } from 'src/utils';
import Content from 'src/components/shared/Content';
import ExternalLink from 'src/components/shared/ExternalLink';
import DeviantLink from 'src/components/shared/DeviantLink';
import FavMe from 'src/components/shared/FavMe';
import StandardHeading from 'src/components/shared/StandardHeading';
import { about, common } from 'src/strings';
import Image from 'next/image';
import InlineIcon from 'src/components/shared/InlineIcon';
import { useTitleSetter } from 'src/hooks';
import { TitleFactoryVoid } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

const titleFactory: TitleFactoryVoid = () => ({
  title: common.titles.about,
  breadcrumbs: [
    { label: common.titles.about, active: true },
  ],
});

const AboutPage: NextPage = () => {
  const dispatch = useDispatch();
  const titleData = useMemo(() => titleFactory(), []);
  useTitleSetter(dispatch, titleData);

  return (
    <Content>
      <div className="d-flex justify-content-center">
        <Image src="/img/logo.svg" alt="MLP Vector Club Website Logo" id="about-logo" width={200} height={200} priority unoptimized />
      </div>
      <StandardHeading
        heading={about.website(<ExternalLink href={CLUB_URL}>MLP-VectorClub</ExternalLink>)}
        lead={about.tagline}
      />
      <section className="what-s-this-site-">
        <h2 id="what-s-this-site-">
          {about.whatsThisSite.title}
        </h2>
        <p>{about.whatsThisSite.p1}</p>
        <p>{about.whatsThisSite.p2}</p>
      </section>
      <section className="attributions">
        <h2>{about.attributions.title}</h2>
        <p>{about.attributions.github(<a href={`${GITHUB_URL}#attributions`}>GitHub page</a>)}</p>
        <p>
          <Link href={PATHS.BLENDING}>
            <a>{about.attributions.blendingCalc[0]}</a>
          </Link>
          {about.attributions.blendingCalc[1]}
          <ExternalLink href="https://github.com/dasprid">
            {about.attributions.blendingCalc[2]}
          </ExternalLink>
          <br />

          <strong>{about.attributions.headingFont}: </strong>
          <ExternalLink href="http://www.mattyhex.net/CMR/">Celestia Medium Redux</ExternalLink>
          <br />

          <strong>{about.attributions.daLogo}</strong>
          {' © '}
          <ExternalLink href="https://www.deviantart.com/">DeviantArt</ExternalLink>
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Adobe_Illustrator_CC_icon.svg">
            <strong>{about.attributions.aiLogo}</strong>
          </ExternalLink>
          {' © Adobe Systems Inc.'}
          <br />

          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Inkscape_Logo.svg">
            <strong>{about.attributions.inkscapeLogo}</strong>
          </ExternalLink>
          {` © ${about.attributions.inkscapeTeam}`}
          <br />

          <ExternalLink href="https://www.deviantart.com/flutterguy317/art/Ponyscape-PNG-354658716">
            <strong>{about.attributions.ponyscapeLogo}</strong>
          </ExternalLink>
          {' © '}
          <DeviantLink username="flutterguy317" />
          <br />

          <strong>Application logo</strong> features Penny Curve, the mascot of our group. The image is based on an expression from{' '}
          <a href="https://www.deviantart.com/pirill-poveniy/art/Collab-Christmas-Vector-of-the-MLP-VC-Mascot-503196118">
            Christmas Vector of the MLP-VC Mascot
          </a> (made by <DeviantLink username="Pirill-Poveniy" />, <DeviantLink username="thediscorded" />,
          {' '}<DeviantLink username="masemj" /> & <DeviantLink username="Ambassad0r" />) with the mane design and eye colours from{' '}
          <a href="https://www.deviantart.com/ambassad0r/art/Penny-Curve-MLP-VectorClub-Mascot-2-0-568079382">
            Penny Curve (MLP-VectorClub Mascot 2.0)
          </a> (made by <DeviantLink username="Ambassad0r" />)
          <br />

          <strong>Color Guide logo vectors</strong>
          {' '}were made by the following artists and their design is © Hasbro Studios, LLC.
          <ul>
            <li>
              <FavMe id="db60g3n">{getGuideLabel('pony')}</FavMe>
              {' by '}
              <DeviantLink username="drakizora" />
            </li>
            <li>
              <FavMe id="d6923sw">{getGuideLabel('eqg')}</FavMe>
              {' by '}
              <DeviantLink username="Charleston-and-itchy" />
            </li>
            <li>
              <FavMe id="ddztpnc">{getGuideLabel('pl')}</FavMe>
              {' by '}
              <DeviantLink username="illumnious" />
            </li>
          </ul>

          <strong>External link icon</strong>
          {' (licensed GPL) taken from '}
          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Icon_External_Link.svg">Wikimedia Commons</ExternalLink>
          <br />

          <strong>Vector-based loading icons</strong>
          {' were generated using '}
          <ExternalLink href="https://loading.io/">Loading.io</ExternalLink>
          {' (some are no longer available)'}
          <br />

          <strong>Browser logos</strong>
          {' (used in session list & the '}
          <Link href="/browser">
            <a>Browser recognition testing page</a>
          </Link>
          ):
        </p>
        <ul>
          <li>
            <FavMe id="d9rtlbv">Edge</FavMe>
            {' by '}
            <DeviantLink username="masemj" />
            {' ('}
            <FavMe id="d8uhefy">designed</FavMe>
            {' by '}
            <DeviantLink username="furrgroup" />
            )
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
            <DeviantLink username="ParallaxMLP" />
            )
          </li>
          <li>
            <FavMe id="dadu3l9">Safari</FavMe>
            {' by '}
            <DeviantLink username="masemj" />
            {' ('}
            <FavMe id="d530knp">designed</FavMe>
            {' by '}
            <DeviantLink username="ParallaxMLP" />
            )
          </li>
          <li>
            Vivaldi from
            {' '}
            <ExternalLink href="https://vivaldi.com/press/">Vivaldi Press Kit</ExternalLink>
          </li>
          <li>
            Other logos not mentioned previously were found on
            {' '}
            <ExternalLink href="https://github.com/alrra/browser-logos/">alrra/browser-logos</ExternalLink>
          </li>
        </ul>
        <p>
          <strong>Episode synopsis data</strong>
          {' is provided by '}
          <ExternalLink href="https://www.themoviedb.org/documentation/api">The Movie Database API</ExternalLink>
          {`. ${common.tmdbDisclaimer}`}
          <br />

          <strong>Coding, design & hosting:</strong>
          {' '}
          <ExternalLink href="https://github.com/SeinopSys">SeinopSys</ExternalLink>
        </p>
      </section>
      <section id="supported-providers">
        <h2>{about.providers.title}</h2>
        <div>
          <p>{about.providers.p1}</p>
          <ul>
            <li><a href="https://sta.sh/">Sta.sh</a>*</li>
            <li><a href="https://deviantart.com/">DeviantArt</a>*</li>
            <li><a href="https://imgur.com/">Imgur</a></li>
            <li><a href="https://derpibooru.org/">Derpibooru</a></li>
            <li><a href="https://app.prntscr.com/">LightShot</a></li>
          </ul>
          <p>{`* ${about.providers.asterisk}`}</p>
        </div>
      </section>
      <section>
        <h2>Can I see the code behind the site?</h2>
        <div>
          <p>Absolutely! Both the front- and backend of this website is open source software, you can find each component on GitHub:</p>
          <ul>
            <li>Frontend: <ExternalLink href={GITHUB_URL}>{PROJECT_NAME}</ExternalLink></li>
            <li>Backend: <ExternalLink href={BACKEND_GITHUB_URL}>{BACKEND_PROJECT_NAME}</ExternalLink></li>
          </ul>
          <p>
            Additionally, the footer will always display the versions of each repository currently being used by the application.
            To show this information, simply click the <InlineIcon icon="chevron-right" fixedWidth /> icon in front of the last update time.
          </p>
        </div>
      </section>
    </Content>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ctx => {
  const { store } = ctx;

  titleSetter(store, titleFactory());
  return {
    props: {},
  };
});

export default AboutPage;
