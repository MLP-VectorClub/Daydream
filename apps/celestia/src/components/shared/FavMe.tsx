import ExternalLink from 'src/components/shared/ExternalLink';
import { FC, PropsWithChildren } from 'react';

export interface FavMeProps extends PropsWithChildren {
  id: string;
}

const FavMe: FC<FavMeProps> = ({ id, children = null, ...rest }) => {
  const url = `https://fav.me/${id}`;
  return (
    <ExternalLink href={url} {...rest}>
      {children || url}
    </ExternalLink>
  );
};

export default FavMe;
