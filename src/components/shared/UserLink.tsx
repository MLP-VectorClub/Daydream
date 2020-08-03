import Link from 'next/link';
import { getProfileLink, ProfileLinkOptions } from '../../utils';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
}

const UserLink: React.FC<PropTypes> = ({ text, ...rest }) => (
  <Link href={getProfileLink(rest)}>
    <a className="user-link">{text || rest.name}</a>
  </Link>
);

export default UserLink;
