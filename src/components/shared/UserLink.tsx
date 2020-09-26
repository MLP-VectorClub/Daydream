import Link from 'next/link';
import { getProfileLink, PATHS, ProfileLinkOptions } from 'src/utils';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
}

const UserLink: React.FC<PropTypes> = ({ text, ...rest }) => (
  <Link href={PATHS.USER()} as={getProfileLink(rest)}>
    <a className="user-link">{text || rest.name}</a>
  </Link>
);

export default UserLink;
