import { useEffect, useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import Link from 'next/link';
import { Nullable } from '../types';
import { DEV_API_URL, GITHUB_URL, PROD_API_URL } from '../config';
import { BuildIdParseResult, getBuildData } from '../utils';
import { useTranslation } from '../i18n';
import TimeAgo from './shared/TimeAgo';
import ContactLink from './shared/ContactLink';
import ContactModal from './ContactModal';
import ExternalLink from './shared/ExternalLink';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [buildData, setBuildData] = useState<Nullable<BuildIdParseResult>>(null);

  useEffect(() => {
    setBuildData(getBuildData());
  }, []);

  let developmentMode = true;
  let commitHash: React.ReactNode = null;
  let commitTime: React.ReactNode = null;
  if (buildData && typeof buildData !== 'string') {
    developmentMode = false;
    commitHash = (
      <>
        @
        <a
          href={`${GITHUB_URL}/commit/${buildData.commitId}`}
          id="visit-github-commit"
        >
          {buildData.commitId}
        </a>
        <UncontrolledTooltip target="visit-github-commit" placement="top">
          {t('footer.commitTitle')}
        </UncontrolledTooltip>
      </>
    );
    commitTime = (
      <>
        {` ${t('footer.created')} `}
        <TimeAgo date={buildData.commitTime} />
      </>
    );
  }

  const apiDocsUrl = developmentMode ? DEV_API_URL : PROD_API_URL;

  return (
    <>
      <footer id="footer">
        <span id="git-info">
          {`${t('footer.running')} `}
          <strong>
            <a href={GITHUB_URL} id="visit-github">
              {GITHUB_URL.split('/').pop()}
            </a>
            <UncontrolledTooltip target="visit-github" placement="top">
              {t('footer.visitGithub')}
            </UncontrolledTooltip>
            {commitHash}
          </strong>
          {commitTime}
        </span>
        {` | `}
        <Link href="/about/privacy">
          <a>{t('footer.privacyPolicy')}</a>
        </Link>
        {` | `}
        <ContactLink>{t('footer.contactUs')}</ContactLink>
        {` | `}
        <ExternalLink href={apiDocsUrl}>
          {t('footer.api')}
        </ExternalLink>
      </footer>
      <ContactModal />
    </>
  );
};

export default Footer;
