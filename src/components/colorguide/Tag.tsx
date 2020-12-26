import { memo, VFC } from 'react';
import { GuideName, Nullable, SlimGuideTag, TagType } from 'src/types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import InlineIcon from 'src/components/shared/InlineIcon';
import Link from 'next/link';
import { PATHS } from 'src/utils';

const TAG_ICON_MAP: Record<TagType, IconProp> = {
  app: 'folder',
  cat: 'users',
  gen: 'tag',
  spec: 'globe-americas',
  char: 'user',
  warn: 'exclamation-triangle',
};

interface PropTypes {
  tag: SlimGuideTag;
  className?: string;
  guide?: Nullable<GuideName>,
}

const Tag: VFC<PropTypes> = ({ tag, className, guide = null }) => {
  const finalClassName = classNames('tag', tag.type && `tag-${tag.type}`, { 'tag-synonym': tag.synonymOf }, className);
  const content = (
    <>
      {tag.type && <InlineIcon icon={TAG_ICON_MAP[tag.type]} first />}
      {tag.name}
    </>
  );

  if (guide) {
    return (
      <Link href={PATHS.GUIDE(guide, { q: tag.name })}>
        <a className={finalClassName}>{content}</a>
      </Link>
    );
  }

  return (
    <span className={finalClassName}>
      {content}
    </span>
  );
};

export default memo(Tag);
