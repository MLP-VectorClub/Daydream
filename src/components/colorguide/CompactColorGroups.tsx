import { ColorGroup } from 'src/types';
import styles from 'modules/CompactColorGroups.module.scss';
import ColorSquare from 'src/components/colorguide/ColorSquare';

interface PropTypes {
  colorGroups: ColorGroup[];
}

const CompactColorGroups: React.VFC<PropTypes> = ({ colorGroups }) => (
  colorGroups.length > 0
    ? (
      <div className={styles.compactColorGroups}>
        {colorGroups.map(cg => (
          <div key={cg.id} className={styles.compactColorGroup}>
            <span className={styles.compactColorGroupLabel}>{cg.label}</span>
            <div className={styles.compactColorList}>
              {cg.colors.map(c => <ColorSquare key={c.id} color={c} compact />)}
            </div>
          </div>
        ))}
      </div>
    )
    : null
);

export default CompactColorGroups;
