import ExternalLink from 'src/components/shared/ExternalLink';
import { FC, PropsWithChildren } from 'react';

const DeviantLink: FC<PropsWithChildren<{ username: string }>> = ({ username, children, ...rest }) => (
  <ExternalLink href={`https://www.deviantart.com/${username}`} {...rest}>
    {children || username}
  </ExternalLink>
);

export default DeviantLink;
