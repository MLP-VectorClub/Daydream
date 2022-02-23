import { VFC } from 'react';
import { GuideName, Nullable, SlimGuideTag } from 'src/types';
import InlineIcon from 'src/components/shared/InlineIcon';
import AppearanceItemTags from 'src/components/colorguide/AppearanceItemTags';

interface PropTypes {
  tags?: SlimGuideTag[];
  guide?: Nullable<GuideName>;
}

const AppearanceTags: VFC<PropTypes> = (props) => {
  const { tags, guide } = props;
  if (!tags || tags.length === 0) return null;

  return (
    <>
      <h2>
        <InlineIcon icon="tags" first size="xs" />
        Tags
      </h2>
      <AppearanceItemTags tags={tags} guide={guide} />
    </>
  );
};

export default AppearanceTags;
