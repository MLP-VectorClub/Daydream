import { VFC } from 'react';
import { GetAppearancesPinnedResult, GuideName, Nullable } from 'src/types';
import AppearanceItem from 'src/components/colorguide/AppearanceItem';
import { usePinnedAppearances } from 'src/hooks';

interface PropTypes {
  guide: Nullable<GuideName>;
  initialData: Nullable<GetAppearancesPinnedResult>
}

const PinnedAppearance: VFC<PropTypes> = ({ initialData, guide }) => {
  const appearances = usePinnedAppearances({ guide }, initialData || undefined);

  if (!appearances) return null;

  return <>{appearances.map(el => <AppearanceItem key={el.id} appearance={el} pinned />)}</>;
};

export default PinnedAppearance;
