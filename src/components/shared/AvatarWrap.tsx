import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
import { AvatarProvider, Nullable } from '../../types';
import { getAvatar } from '../../utils';

interface PropTypes {
  avatarUrl: Nullable<string>;
  avatarProvider: AvatarProvider;
  email: Nullable<string>;
  size: number;
}

export default (({ avatarProvider, avatarUrl, size, email = null }) => {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>(avatarUrl || getAvatar({
    email,
    size,
  }));

  useEffect(() => {
    setCurrentAvatarUrl(avatarUrl || getAvatar({ email, size }));
  }, [avatarUrl, size, email]);

  return (
    <div className={`avatar-wrap provider-${avatarProvider}`}>
      <LazyLoadImage
        src={currentAvatarUrl}
        className="avatar"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
}) as React.FC<PropTypes>;
