import { FC } from 'react';
import { Nullable } from 'src/types';
import { GetAppearancesPinnedResult, GuideName } from '@mlp-vectorclub/api-types';
import AppearanceItem from 'src/components/colorguide/AppearanceItem';
import { usePinnedAppearances } from 'src/hooks';

interface PropTypes {
  guide: Nullable<GuideName>;
  initialData: Nullable<GetAppearancesPinnedResult>;
}

const PinnedAppearance: FC<PropTypes> = ({ initialData, guide }) => {
  const appearances = usePinnedAppearances({ guide }, initialData || undefined);

  if (!appearances) return null;

  return (
    <>
      {appearances.map((el) => (
        <AppearanceItem key={el.id} appearance={el} pinned guide={guide} />
      ))}
    </>
  );
};

export default PinnedAppearance;
