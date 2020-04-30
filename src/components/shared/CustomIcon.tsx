import classNames from 'classnames';
import React from 'react';

export interface CustomIconProps {
  src: string;
  alt?: string;
  className?: string;
}

export default (({ src, alt = '', className }) => (
  <img src={src} className={classNames(className, 'svg-inline--fa custom-icon')} alt={alt} />
)) as React.FC<CustomIconProps>;
