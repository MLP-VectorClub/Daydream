import { LazyLoadImage } from 'react-lazy-load-image-component';
import { memo } from 'react';
import classNames from 'classnames';
import { AvatarProvider, Nullable } from '../../types';
import { getAvatar } from '../../utils';

interface PropTypes {
  avatarUrl: Nullable<string>;
  avatarProvider: AvatarProvider;
  email?: Nullable<string>;
  emailHash?: Nullable<string>;
  size: number;
  className?: string;
}

const AvatarWrap: React.FC<PropTypes> = ({
  avatarProvider,
  avatarUrl,
  size,
  email = null,
  emailHash = null,
  className = '',
}) => (
  <div className={classNames(`avatar-wrap provider-${avatarProvider}`, className)}>
    <LazyLoadImage
      src={avatarUrl || getAvatar({ email, emailHash, size })}
      className="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  </div>
);
export default memo(AvatarWrap);
