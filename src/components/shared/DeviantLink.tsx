import ExternalLink from './ExternalLink';

export default (({ username, children, ...rest }) => (
  <ExternalLink href={`https://www.deviantart.com/${username}`} {...rest}>
    {children || username}
  </ExternalLink>
)) as React.FC<{ username: string }>;
