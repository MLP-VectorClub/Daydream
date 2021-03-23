import classNames from 'classnames';
import { VFC } from 'react';

export interface CustomIconProps {
  src: string;
  alt?: string;
  className?: string;
}

const CustomIcon: VFC<CustomIconProps> = ({ src, alt = '', className }) => (
  <img src={src} className={classNames(className, 'svg-inline--fa custom-icon')} alt={alt} />
);

export default CustomIcon;
