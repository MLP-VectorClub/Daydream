import ExternalLink from 'src/components/shared/ExternalLink';
import { FC } from 'react';

const DeviantLink: FC<{ username: string }> = ({ username, children, ...rest }) => (
  <ExternalLink href={`https://www.deviantart.com/${username}`} {...rest}>
    {children || username}
  </ExternalLink>
);

export default DeviantLink;
