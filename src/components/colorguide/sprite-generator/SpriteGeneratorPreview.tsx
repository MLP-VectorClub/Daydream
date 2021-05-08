import { useRef, VFC } from 'react';
import classNames from 'classnames';
import styles from 'modules/SpriteGeneratorPreview.module.scss';

interface PropTypes {
  loading: boolean;
  options?: unknown;
}

export const SpriteGeneratorPreview: VFC<PropTypes> = ({ loading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <div className={styles.preview}>
      <canvas ref={canvasRef} className={classNames({ hidden: loading })} />
    </div>
  );
};
