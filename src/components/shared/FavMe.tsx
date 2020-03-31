import ExternalLink from './ExternalLink';

export default (({ id, children = null, ...rest }) => {
  const url = `https://fav.me/${id}`;
  return (
    <ExternalLink href={url} {...rest}>
      {children || url}
    </ExternalLink>
  );
}) as React.FC<{ id: string }>;
