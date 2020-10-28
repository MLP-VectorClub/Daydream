import { common } from 'src/strings';
import React, { useMemo } from 'react';
import TimeAgo from 'src/components/shared/TimeAgo';
import { ServerInfoHookValue } from 'src/hooks';
import { getBuildData, isClientSide } from 'src/utils';

const buildData = isClientSide ? getBuildData() : null;

type PropTypes = Pick<ServerInfoHookValue, 'serverInfo'>;

const FooterLastUpdateInfo: React.VFC<PropTypes> = ({ serverInfo }) => {
  const latestDate = useMemo<Date | undefined>(() => {
    const dates: Date[] = [];
    if (buildData && typeof buildData !== 'string') dates.push(buildData.commitTime);
    if (serverInfo && serverInfo?.commitDate) dates.push(serverInfo.commitDate);

    if (dates.length < 2) return dates[0];
    return dates.sort((a, b) => b.getTime() - a.getTime()).shift();
  }, [serverInfo]);

  return (
    <span id="update-info">
      {`${common.footer.lastUpdate} `}
      {latestDate ? <TimeAgo id="last-update-time" date={latestDate} /> : common.footer.unknown}
    </span>
  );
};

export default FooterLastUpdateInfo;
