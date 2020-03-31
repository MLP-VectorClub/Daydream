import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nullable } from '../types';
import { GITHUB_URL } from '../config';
import { BuildIdParseResult, getBuildData } from '../utils';
import TimeAgo from './shared/TimeAgo';
import { useTranslation } from '../i18n';
import ContactLink from './shared/ContactLink';
import ContactModal from './ContactModal';

export default (() => {
  const { t } = useTranslation();
  const [buildData, setBuildData] = useState<Nullable<BuildIdParseResult>>(null);

  useEffect(() => {
    setBuildData(getBuildData());
  }, []);

  let commitHash: React.ReactNode = null;
  let commitTime: React.ReactNode;
  if (buildData && typeof buildData !== 'string') {
    commitHash = (
      <>
        @
        <a
          href={`${GITHUB_URL}/commit/${buildData.commitId}`}
          title={t('footer.commitTitle')}
        >
          {buildData.commitId}
        </a>
      </>
    );
    commitTime = (
      <>
        {` ${t('footer.created')} `}
        <TimeAgo date={buildData.commitTime} />
      </>
    );
  } else {
    commitTime = ` (${t('footer.noVersion')})`;
  }

  return (
    <>
      <footer id="footer">
        <span id="git-info">
          {`${t('footer.running')} `}
          <strong>
            <a href={GITHUB_URL} title={t('footer.visitGithub')}>
              {GITHUB_URL.split('/').pop()}
            </a>
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
      </footer>
      <ContactModal />
    </>
  );
}) as React.FC;
