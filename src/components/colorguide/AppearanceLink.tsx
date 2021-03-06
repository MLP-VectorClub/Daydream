import { VFC } from 'react';
import { PreviewAppearance } from 'src/types';
import { PATHS } from 'src/paths';
import Link from 'next/link';
import { AppearancePreview } from 'src/components/colorguide/AppearancePreview';
import styles from 'modules/AppearanceLink.module.scss';

export const AppearanceLink: VFC<PreviewAppearance> = ({ id, label, previewData }) => (
  <Link href={PATHS.APPEARANCE({ id, label })}>
    <a className={styles.appearanceLink}>
      <AppearancePreview data={previewData} />
      <span className="appearance-name">{label}</span>
    </a>
  </Link>
);
