import {
  getProfileLink,
  ProfileLinkOptions,
} from '../../utils';
import { Link } from '../../routes';

interface PropTypes extends ProfileLinkOptions {
  text?: string;
}

export default (({ text, ...rest }) => (
  <Link route={getProfileLink(rest)}>
    <a className="user-link">{text || rest.name}</a>
  </Link>
)) as React.FC<PropTypes>;
