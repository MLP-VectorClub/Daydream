import { LazyLoadImage } from 'react-lazy-load-image-component';
import React, { memo } from 'react';
import classNames from 'classnames';
import { AvatarProvider, Nullable } from '../../types';
import { GUEST_AVATAR } from '../../config';

interface PropTypes {
  avatarUrl: Nullable<string>;
  avatarProvider: AvatarProvider;
  email?: Nullable<string>;
  emailHash?: Nullable<string>;
  size: number;
  className?: string;
}

const AvatarWrap: React.FC<PropTypes> = memo(({
  avatarProvider,
  avatarUrl,
  size,
  className,
}) => (
  <div className={classNames(`avatar-wrap provider-${avatarProvider}`, className)}>
    <LazyLoadImage
      src={avatarUrl || GUEST_AVATAR}
      className="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  </div>
));

export default AvatarWrap;
