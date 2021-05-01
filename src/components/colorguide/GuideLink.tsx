import { FC } from 'react';
import Link from 'next/link';
import { GuideName } from 'src/types';
import { PATHS } from 'src/paths';
import { getGuideLabel, getGuideTitle } from 'src/utils';

interface PropTypes {
  name: GuideName;
  title?: boolean;
}

export const GuideLink: FC<PropTypes> = ({ name, title = false }) => (
  <Link href={PATHS.GUIDE(name)}>
    <a>{title ? getGuideTitle(name) : getGuideLabel(name)}</a>
  </Link>
);
