import Link from 'next/link';
import React from 'react';
import { API_DOCS_URL } from 'src/config';
import { PATHS } from 'src/utils';
import ContactLink from 'src/components/shared/ContactLink';
import ContactModal from 'src/components/ContactModal';
import ExternalLink from 'src/components/shared/ExternalLink';
import Abbr from 'src/components/shared/Abbr';
import { common } from 'src/strings';
import FooterVersionInfo from 'src/components/shared/FooterVersionInfo';

const Footer: React.VFC = () => (
  <>
    <footer id="footer">
      <FooterVersionInfo />
      {` | `}
      <Link href={PATHS.PRIVACY_POLICY}>
        <a>{common.footer.privacyPolicy}</a>
      </Link>
      {` | `}
      <ContactLink>{common.footer.contactUs}</ContactLink>
      {` | `}
      <Abbr id="api-docs" title={common.footer.apiMeaning}>
        <ExternalLink id="api-docs" href={API_DOCS_URL}>
          {common.footer.api}
        </ExternalLink>
      </Abbr>
    </footer>
    <ContactModal />
  </>
);

export default Footer;
