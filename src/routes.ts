import Routes,
{ LinkProps as LinkPropsA } from 'next-routes';
import { LinkProps as LinkPropsB } from 'next/link';
import { ComponentType } from 'react';

const routes = new Routes()
  .add('/cg/:guide', 'color-guide')
  // .add('/cg/v/:id', 'appearance')
  .add('/about/privacy', 'privacy-policy')
  .add('/@:username', 'profile')
  .add('/users/:id([0-9]+)', 'profile')
  .add('/users/:id([0-9]+)-:username', 'profile')
  .add('about');

export default routes;

const Link = routes.Link as ComponentType<LinkPropsA & Pick<LinkPropsB, 'passHref'>>;
export { Link };
