import { FC, memo } from 'react';
import { Nullable } from 'src/types';
import { GuideName, SlimGuideTag, TagType } from '@mlp-vectorclub/api-types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import InlineIcon from 'src/components/shared/InlineIcon';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import styles from 'modules/Tag.module.scss';

const TAG_ICON_MAP: Record<TagType, IconProp> = {
  app: 'folder',
  cat: 'users',
  gen: 'tag',
  spec: 'globe-americas',
  char: 'user',
  warn: 'exclamation-triangle',
};
const TAG_CLASS_MAP: Record<TagType, string> = {
  app: styles.typeClothing,
  cat: styles.typeCategory,
  gen: styles.typeGender,
  spec: styles.typeSpecies,
  char: styles.typeCharacter,
  warn: styles.typeWarning,
};

interface PropTypes {
  tag: SlimGuideTag;
  className?: string;
  guide?: Nullable<GuideName>;
}

const TagComponent: FC<PropTypes> = ({ tag, className, guide = null }) => {
  const tagTypeClass = tag.type && tag.type in TAG_CLASS_MAP && TAG_CLASS_MAP[tag.type];
  const finalClassName = classNames(styles.tag, tagTypeClass, { [styles.synonym]: tag.synonymOf }, className);
  const content = (
    <>
      {tag.type && <InlineIcon icon={TAG_ICON_MAP[tag.type]} first />}
      {tag.name}
    </>
  );

  if (guide) {
    return (
      <Link href={PATHS.GUIDE(guide, { q: tag.name })} className={finalClassName}>
        {content}
      </Link>
    );
  }

  return <span className={finalClassName}>{content}</span>;
};

export const Tag = memo(TagComponent);
