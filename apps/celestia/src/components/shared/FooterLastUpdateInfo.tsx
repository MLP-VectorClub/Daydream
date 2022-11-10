import { FC, useMemo } from 'react';
import TimeAgo from 'src/components/shared/TimeAgo';
import { ServerInfoHookValue } from 'src/hooks';
import { getBuildData } from 'src/utils';
import { IS_CLIENT_SIDE } from 'src/config';
import { useTranslation } from 'next-i18next';

const buildData = IS_CLIENT_SIDE ? getBuildData() : null;

type PropTypes = Pick<ServerInfoHookValue, 'serverInfo'>;

const FooterLastUpdateInfo: FC<PropTypes> = ({ serverInfo }) => {
  const { t } = useTranslation();
  const latestDate = useMemo<Date | undefined>(() => {
    const dates: Date[] = [];
    if (buildData && typeof buildData !== 'string') dates.push(buildData.commitTime);
    if (serverInfo && serverInfo?.commitDate) dates.push(serverInfo.commitDate);

    if (dates.length < 2) return dates[0];
    return dates.sort((a, b) => b.getTime() - a.getTime()).shift();
  }, [serverInfo]);

  return (
    <span id="update-info">
      {`${t('common:footer.lastUpdate')} `}
      {latestDate ? <TimeAgo id="last-update-time" date={latestDate} /> : t('common:footer.unknown')}
    </span>
  );
};

export default FooterLastUpdateInfo;
