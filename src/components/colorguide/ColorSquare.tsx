import { Color } from 'src/types';
import styles from 'modules/ColorSquare.module.scss';
import classNames from 'classnames';
import { VFC } from 'react';

interface PropTypes {
  color: Color;
  compact?: boolean;
}

const ColorSquare: VFC<PropTypes> = ({ color, compact = false }) => (
  <span className={classNames(styles.colorSquare, { [styles.compactColorSquare]: compact })} style={{ backgroundColor: color.hex }}>
    {color.hex}
  </span>
);

export default ColorSquare;
