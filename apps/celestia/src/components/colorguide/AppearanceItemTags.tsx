import { FC, useMemo } from 'react';
import { Nullable } from 'src/types';
import { GuideName, SlimGuideTag } from '@mlp-vectorclub/api-types';
import { Tag } from 'src/components/colorguide/Tag';
import styles from 'modules/AppearanceTags.module.scss';
import { sortTagsByType } from 'src/utils';

interface PropTypes {
  tags: SlimGuideTag[];
  guide?: Nullable<GuideName>;
}

const AppearanceItemTags: FC<PropTypes> = ({ tags, guide }) => {
  const sortedTags = useMemo<PropTypes['tags']>(() => {
    // No point in sorting empty and single-item arrays
    if (tags.length < 2) return tags;

    return tags.sort(sortTagsByType);
  }, [tags]);

  if (sortedTags.length === 0) return null;

  return (
    <div className={styles.tags}>
      {sortedTags.map((tag) => (
        <Tag key={tag.id} tag={tag} guide={guide} />
      ))}
    </div>
  );
};

export default AppearanceItemTags;
