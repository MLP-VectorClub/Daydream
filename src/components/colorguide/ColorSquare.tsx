import { Color } from 'src/types';
import styles from 'modules/ColorSquare.module.scss';
import classNames from 'classnames';

interface PropTypes {
  color: Color;
  compact?: boolean;
}

const ColorSquare: React.VFC<PropTypes> = ({ color, compact = false }) => (
  <span className={classNames(styles.colorSquare, { [styles.compactColorSquare]: compact })} style={{ backgroundColor: color.hex }}>
    {color.hex}
  </span>
);

export default ColorSquare;
