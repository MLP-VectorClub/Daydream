import Routes, { LinkProps as LinkPropsA } from 'next-routes';
import { LinkProps as LinkPropsB } from 'next/link';
import { ComponentType } from 'react';
import { PATHS } from './config';

const routes = new Routes()
  // TODO redirect /colorguide/appearance/* to shorter routes
  .add(PATHS.GUIDE, 'color-guide')
  // .add('/cg/v/:id', 'appearance')
  .add(PATHS.PRIVACY_POLICY, 'privacy-policy')
  .add(PATHS.USER_LEGACY, 'profile')
  .add(PATHS.USER, 'profile')
  .add(PATHS.USER_LONG, 'profile')
  .add(PATHS.ABOUT, 'about');

export default routes;

export type AppLinkProps = LinkPropsA & Pick<LinkPropsB, 'passHref'>;
const Link = routes.Link as ComponentType<AppLinkProps>;
export { Link };
