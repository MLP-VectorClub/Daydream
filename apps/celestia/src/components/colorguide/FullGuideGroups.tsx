import { FC, useMemo } from 'react';
import { GetAppearancesAllResult, SlimAppearance } from '@mlp-vectorclub/api-types';
import { keyBy } from 'lodash';
import FullGuideAppearanceList from 'src/components/colorguide/FullGuideAppearanceList';

const FullGuideGroups: FC<GetAppearancesAllResult> = ({ appearances, groups }) => {
  const appearanceRecord = useMemo<Record<number, SlimAppearance>>(() => keyBy(appearances, 'id'), [appearances]);

  if (groups.length === 0) {
    return <FullGuideAppearanceList appearances={appearances} />;
  }

  return (
    <>
      {groups.map((g) => (
        <section key={g.name}>
          <h2>{g.name}</h2>
          <FullGuideAppearanceList appearances={g.appearanceIds.map((id) => appearanceRecord[id])} />
        </section>
      ))}
    </>
  );
};

export default FullGuideGroups;
