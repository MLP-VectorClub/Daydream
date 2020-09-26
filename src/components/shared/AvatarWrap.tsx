import { LazyLoadImage } from 'react-lazy-load-image-component';
import React, { memo } from 'react';
import classNames from 'classnames';
import { AvatarProvider, Nullable, VectorApp } from 'src/types';
import { GUEST_AVATAR } from 'src/config';

interface PropTypes {
  avatarUrl: Nullable<string>;
  avatarProvider: AvatarProvider;
  email?: Nullable<string>;
  emailHash?: Nullable<string>;
  size: number;
  className?: string;
  vectorApp?: VectorApp | null;
}

const AvatarWrap: React.FC<PropTypes> = memo(({
  avatarProvider,
  avatarUrl,
  size,
  className,
  vectorApp = null,
}) => (
  <div
    className={classNames(`avatar-wrap provider-${avatarProvider}`, className, {
      [`app-${vectorApp}`]: vectorApp !== null,
    })}
  >
    <LazyLoadImage
      src={avatarUrl || GUEST_AVATAR}
      className="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  </div>
));

export default AvatarWrap;
