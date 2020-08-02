import { getProfileLink, ProfileLinkOptions } from '../../utils';
import { Link } from '../../routes';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
}

const UserLink: React.FC<PropTypes> = ({ text, ...rest }) => (
  <Link route={getProfileLink(rest)}>
    <a className="user-link">{text || rest.name}</a>
  </Link>
);

export default UserLink;
