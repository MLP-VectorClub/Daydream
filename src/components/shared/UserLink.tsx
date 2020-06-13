import Link from 'next/link';
import { getProfileLink } from '../../utils';

interface PropTypes {
  userName: string;
  text?: string;
}

export default (({ userName, text }) => (
  <Link href={getProfileLink(userName)}>
    <a className="user-link">{text || userName}</a>
  </Link>
)) as React.FC<PropTypes>;
