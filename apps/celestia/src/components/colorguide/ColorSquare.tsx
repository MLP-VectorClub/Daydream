import { Color } from '@mlp-vectorclub/api-types';
import styles from 'modules/ColorSquare.module.scss';
import classNames from 'classnames';
import { RefObject, VFC } from 'react';

interface PropTypes {
  color: Color;
  compact?: boolean;
  innerRef?: RefObject<HTMLSpanElement>;
}

const ColorSquare: VFC<PropTypes> = ({ color, compact = false, innerRef }) => (
  <span
    className={classNames(styles.colorSquare, {
      [styles.compactColorSquare]: compact,
    })}
    style={{ backgroundColor: color.hex }}
    ref={innerRef}
  >
    {color.hex}
  </span>
);

export default ColorSquare;
