import { FC } from 'react';
import { Nullable } from 'src/types';
import { GuideName, SlimGuideTag } from '@mlp-vectorclub/api-types';
import InlineIcon from 'src/components/shared/InlineIcon';
import AppearanceItemTags from 'src/components/colorguide/AppearanceItemTags';

interface PropTypes {
  tags?: SlimGuideTag[];
  guide?: Nullable<GuideName>;
}

const AppearanceTags: FC<PropTypes> = (props) => {
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
