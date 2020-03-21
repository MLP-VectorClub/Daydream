import Link from 'next/link';

interface PropTypes {
  userName: string;
  text?: string;
}

export default (({ userName, text }) => (
  <Link href={`/@${userName}`}>
    <a className="user-link">{text || userName}</a>
  </Link>
)) as React.FC<PropTypes>;
