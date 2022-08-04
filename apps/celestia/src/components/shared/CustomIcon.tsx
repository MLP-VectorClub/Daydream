import classNames from 'classnames';
import { FC } from 'react';

export interface CustomIconProps {
  src: string;
  alt?: string;
  className?: string;
}

const CustomIcon: FC<CustomIconProps> = ({ src, alt = '', className }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} className={classNames(className, 'svg-inline--fa')} alt={alt} />
);

export default CustomIcon;
