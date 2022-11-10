import { FC } from 'react';
import Link from 'next/link';
import { GuideName } from '@mlp-vectorclub/api-types';
import { PATHS } from 'src/paths';
import { getGuideLabel, getGuideTitle } from 'src/utils';

interface PropTypes {
  name: GuideName;
  title?: boolean;
}

export const GuideLink: FC<PropTypes> = ({ name, title = false }) => (
  <Link href={PATHS.GUIDE(name)}>
    {title ? getGuideTitle(name) : getGuideLabel(name)}
  </Link>
);
