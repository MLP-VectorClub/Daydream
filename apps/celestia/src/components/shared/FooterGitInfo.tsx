import { BACKEND_GITHUB_URL, BACKEND_PROJECT_NAME, GITHUB_URL, IS_CLIENT_SIDE, PROJECT_NAME } from 'src/config';
import { UncontrolledTooltip } from 'reactstrap';
import TimeAgo from 'src/components/shared/TimeAgo';
import { ServerInfoHookValue } from 'src/hooks';
import { getBuildData } from 'src/utils';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

const buildData = IS_CLIENT_SIDE ? getBuildData() : null;

type PropTypes = Pick<ServerInfoHookValue, 'serverInfo' | 'loading' | 'backendDown'>;

const FooterGitInfo: FC<PropTypes> = ({ serverInfo, loading, backendDown }) => {
  const { t } = useTranslation();
  let commitHash: ReactNode = null;
  let commitTime: ReactNode = null;
  if (buildData && typeof buildData !== 'string') {
    commitHash = (
      <>
        @
        <a href={`${GITHUB_URL}/commit/${buildData.commitId}`} id="visit-github-commit">
          {buildData.commitId}
        </a>
        <UncontrolledTooltip target="visit-github-commit" placement="top" fade={false}>
          {t('common:footer.commitTitle')}
        </UncontrolledTooltip>
      </>
    );
    commitTime = (
      <>
        {` ${t('common:footer.created')} `}
        <TimeAgo id="github-commit-time" date={buildData.commitTime} />
      </>
    );
  }
  let backendCommitHash: ReactNode = null;
  let backendCommitTime: ReactNode = null;
  if (!loading && !backendDown && serverInfo && serverInfo.commitId) {
    backendCommitHash = (
      <>
        @
        <a href={`${BACKEND_GITHUB_URL}/commit/${serverInfo.commitId}`} id="visit-backend-github-commit">
          {serverInfo.commitId}
        </a>
        <UncontrolledTooltip target="visit-backend-github-commit" placement="top" fade={false}>
          {t('common:footer.commitTitle')}
        </UncontrolledTooltip>
      </>
    );
    backendCommitTime = serverInfo.commitDate && (
      <>
        {` ${t('common:footer.created')} `}
        <TimeAgo id="backend-github-commit-time" date={serverInfo.commitDate} />
      </>
    );
  }

  return (
    <span id="git-info">
      {`${t('common:footer.frontend')}: `}
      <strong>
        <a href={GITHUB_URL} id="visit-github">
          {PROJECT_NAME}
        </a>
        <UncontrolledTooltip target="visit-github" placement="top" fade={false}>
          {t('common:footer.visitGithub')}
        </UncontrolledTooltip>
        {commitHash}
      </strong>
      {commitTime}
      {` | ${t('common:footer.backend')}: `}
      <strong>
        <a href={BACKEND_GITHUB_URL} id="visit-backend-github">
          {BACKEND_PROJECT_NAME}
        </a>
        <UncontrolledTooltip target="visit-backend-github" placement="top" fade={false}>
          {t('common:footer.visitGithub')}
        </UncontrolledTooltip>
        {backendCommitHash}
      </strong>
      {backendCommitTime}
    </span>
  );
};

export default FooterGitInfo;
