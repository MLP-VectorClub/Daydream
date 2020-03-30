const buildIdRegex = /^[a-f0-9]+;\d+$/i;

export type BuildIdParseResult = string | { commitId: string; commitTime: Date };

export const getBuildData: () => BuildIdParseResult = () => {
  // eslint-disable-next-line no-underscore-dangle
  const { buildId } = window.__NEXT_DATA__;

  if (!buildIdRegex.test(buildId)) {
    // Spit back build ID if it does not match the expected format
    return buildId;
  }

  const [commitId, rawCommitTime] = buildId.split(';');

  return {
    commitId,
    commitTime: new Date(1e3 * Number(rawCommitTime)),
  };
};
