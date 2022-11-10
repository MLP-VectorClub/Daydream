import { FC, useMemo } from 'react';
import ColorSquare from 'src/components/colorguide/ColorSquare';
import { Color } from '@mlp-vectorclub/api-types';
import { hexToRgb } from 'src/utils';
import classNames from 'classnames';
import styles from 'modules/ColorListItem.module.scss';

interface PropTypes {
  color: Color;
  hideColorInfo?: boolean;
}

export const ColorListItem: FC<PropTypes> = ({ color, hideColorInfo }) => {
  const rgb = useMemo(() => {
    if (!hideColorInfo && color.hex) return hexToRgb(color.hex);
  }, [color.hex, hideColorInfo]);
  return (
    <li key={color.id} className={styles.colorListItem}>
      <ColorSquare color={color} />
      <span className={classNames(styles.colorInfo, rgb && styles.detailed)}>
        <span className={styles.colorLabel}>{color.label}</span>
        {rgb && (
          <span className={styles.colorDetails}>
            {color.hex} • rgb({rgb.red}, {rgb.green}, {rgb.blue})
          </span>
        )}
      </span>
    </li>
  );
};
