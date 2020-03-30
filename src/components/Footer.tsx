import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Nullable, WithTFunction } from '../types';
import { GITHUB_URL } from '../config';
import { BuildIdParseResult, getBuildData } from '../utils';
import TimeAgo from './shared/TimeAgo';

export default (({ t }) => {
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
      <a href="/about/privacy">{t('footer.privacyPolicy')}</a>
      {` | `}
      {/* TODO Extract into reusable component */}
      <a className="send-feedback">{t('footer.contactUs')}</a>
    </footer>
  );
}) as NextPage<WithTFunction>;
