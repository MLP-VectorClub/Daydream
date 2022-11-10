import Link from 'next/link';
import { API_DOCS_URL } from 'src/config';
import { PATHS } from 'src/paths';
import ContactLink from 'src/components/shared/ContactLink';
import ContactModal from 'src/components/ContactModal';
import ExternalLink from 'src/components/shared/ExternalLink';
import Abbr from 'src/components/shared/Abbr';
import FooterVersionInfo from 'src/components/shared/FooterVersionInfo';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();
  return <>
    <footer id="footer" role="contentinfo">
      <FooterVersionInfo />
      {` | `}
      <Link href={PATHS.PRIVACY_POLICY}>
        {t('common:footer.privacyPolicy')}
      </Link>
      {` | `}
      <ContactLink>{t('common:footer.contactUs')}</ContactLink>
      {` | `}
      <Abbr id="api-docs" title={t('common:footer.apiMeaning')}>
        <ExternalLink id="api-docs" href={API_DOCS_URL}>
          {t('common:footer.api')}
        </ExternalLink>
      </Abbr>
    </footer>
    <ContactModal />
  </>;
};

export default Footer;
