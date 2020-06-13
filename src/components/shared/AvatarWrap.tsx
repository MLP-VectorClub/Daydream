import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
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

export default (({ avatarProvider, avatarUrl, size, email = null, emailHash = null, className = '' }) => {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>(avatarUrl || getAvatar({
    email,
    emailHash,
    size,
  }));

  useEffect(() => {
    setCurrentAvatarUrl(avatarUrl || getAvatar({ email, emailHash, size }));
  }, [avatarUrl, size, email, emailHash]);

  return (
    <div className={classNames(`avatar-wrap provider-${avatarProvider}`, className)}>
      <LazyLoadImage
        src={currentAvatarUrl}
        className="avatar"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}) as React.FC<PropTypes>;
