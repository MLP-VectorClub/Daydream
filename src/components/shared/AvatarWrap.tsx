import { memo, VFC } from 'react';
import classNames from 'classnames';
import { AvatarProvider, Nullable, VectorApp } from 'src/types';
import { GUEST_AVATAR } from 'src/config';
import Image from 'next/image';

interface PropTypes {
  avatarUrl: Nullable<string>;
  avatarProvider: AvatarProvider;
  email?: Nullable<string>;
  emailHash?: Nullable<string>;
  size: number;
  className?: string;
  vectorApp?: VectorApp | null;
}

const AvatarWrap: VFC<PropTypes> = memo(({
  avatarProvider,
  avatarUrl,
  size,
  className,
  vectorApp = null,
}) => (
  <div
    className={classNames(`avatar-wrap provider-${avatarProvider}`, className, vectorApp && `app-${vectorApp}`)}
  >
    <Image
      src={avatarUrl || GUEST_AVATAR}
      className="avatar"
      width={size}
      height={size}
      unoptimized
      priority
    />
  </div>
));

export default AvatarWrap;
