import { common } from 'src/strings';
import { BACKEND_GITHUB_URL, BACKEND_PROJECT_NAME, GITHUB_URL, PROJECT_NAME } from 'src/config';
import { UncontrolledTooltip } from 'reactstrap';
import React from 'react';
import TimeAgo from 'src/components/shared/TimeAgo';
import { ServerInfoHookValue } from 'src/hooks';
import { getBuildData, isClientSide } from 'src/utils';

const buildData = isClientSide ? getBuildData() : null;

type PropTypes = Pick<ServerInfoHookValue, 'serverInfo' | 'loading' | 'backendDown'>;

const FooterGitInfo: React.VFC<PropTypes> = ({ serverInfo, loading, backendDown }) => {
  let commitHash: React.ReactNode = null;
  let commitTime: React.ReactNode = null;
  if (buildData && typeof buildData !== 'string') {
    commitHash = (
      <>
        @
        <a
          href={`${GITHUB_URL}/commit/${buildData.commitId}`}
          id="visit-github-commit"
        >
          {buildData.commitId}
        </a>
        <UncontrolledTooltip target="visit-github-commit" placement="top" fade={false}>
          {common.footer.commitTitle}
        </UncontrolledTooltip>
      </>
    );
    commitTime = (
      <>
        {` ${common.footer.created} `}
        <TimeAgo id="github-commit-time" date={buildData.commitTime} />
      </>
    );
  }
  let backendCommitHash: React.ReactNode = null;
  let backendCommitTime: React.ReactNode = null;
  if (!loading && !backendDown && serverInfo) {
    backendCommitHash = (
      <>
        @
        <a
          href={`${BACKEND_GITHUB_URL}/commit/${serverInfo.commitId}`}
          id="visit-backend-github-commit"
        >
          {serverInfo.commitId}
        </a>
        <UncontrolledTooltip target="visit-backend-github-commit" placement="top" fade={false}>
          {common.footer.commitTitle}
        </UncontrolledTooltip>
      </>
    );
    backendCommitTime = serverInfo.commitDate && (
      <>
        {` ${common.footer.created} `}
        <TimeAgo id="backend-github-commit-time" date={serverInfo.commitDate} />
      </>
    );
  }

  return (
    <span id="git-info">
      {`${common.footer.frontend}: `}
      <strong>
        <a href={GITHUB_URL} id="visit-github">
          {PROJECT_NAME}
        </a>
        <UncontrolledTooltip target="visit-github" placement="top" fade={false}>
          {common.footer.visitGithub}
        </UncontrolledTooltip>
        {commitHash}
      </strong>
      {commitTime}
      {` | ${common.footer.backend}: `}
      <strong>
        <a href={BACKEND_GITHUB_URL} id="visit-backend-github">
          {BACKEND_PROJECT_NAME}
        </a>
        <UncontrolledTooltip target="visit-backend-github" placement="top" fade={false}>
          {common.footer.visitGithub}
        </UncontrolledTooltip>
        {backendCommitHash}
      </strong>
      {backendCommitTime}
    </span>
  );
};

export default FooterGitInfo;
