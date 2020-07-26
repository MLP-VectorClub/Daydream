import { PropsWithChildren } from 'react';
import { Link } from '../../routes';
import {
  getProfileLink,
  ProfileLinkOptions,
} from '../../utils';

type PropTypes = PropsWithChildren<ProfileLinkOptions>;

export default (({ children = null, ...rest }) => {
  const content = children === null ? <a>{rest.name}</a> : children;

  if (rest.id === null) {
    return content;
  }

  return (
    <Link route={getProfileLink(rest)} passHref={children !== null}>
      {content}
    </Link>
  );
}) as React.FC<PropTypes>;
