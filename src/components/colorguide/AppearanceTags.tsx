import { useMemo, VFC } from 'react';
import { GuideName, Nullable, SlimGuideTag } from 'src/types';
import Tag from 'src/components/colorguide/Tag';
import styles from 'modules/AppearanceTags.module.scss';
import { sortTagsByType } from 'src/utils';

interface PropTypes {
  tags: SlimGuideTag[];
  guide?: Nullable<GuideName>;
}

const AppearanceTags: VFC<PropTypes> = ({ tags, guide }) => {
  const sortedTags = useMemo<PropTypes['tags']>(() => {
    if (tags.length === 0) return [];

    return tags.sort(sortTagsByType);
  }, [tags]);

  if (sortedTags.length === 0) return null;

  return (
    <div className={styles.tags}>
      {sortedTags.map(tag => <Tag key={tag.id} tag={tag} guide={guide} />)}
    </div>
  );
};

export default AppearanceTags;
