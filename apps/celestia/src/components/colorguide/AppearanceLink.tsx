import { VFC } from 'react';
import { PreviewAppearance } from 'src/types';
import { PATHS } from 'src/paths';
import Link from 'next/link';
import { AppearancePreview } from 'src/components/colorguide/AppearancePreview';
import styles from 'modules/AppearanceLink.module.scss';

export const AppearanceLink: VFC<PreviewAppearance> = ({ id, label, guide, previewData }) => (
  <Link href={PATHS.APPEARANCE({ id, label, guide })}>
    <a className={styles.appearanceLink}>
      <AppearancePreview data={previewData} className={styles.appearancePreview} />
      <span className="appearance-name">{label}</span>
    </a>
  </Link>
);
