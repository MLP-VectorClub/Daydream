import Link from 'next/link';
import { Nullable } from '../../types';

export default (({ username, children = null }) => {
  const content = children === null ? <a>{username}</a> : children;

  if (username === null) {
    return content;
  }

  return (
    <Link href={`/@${username}`} passHref={children !== null}>
      {content}
    </Link>
  );
}) as React.FC<{ username: Nullable<string> }>;
