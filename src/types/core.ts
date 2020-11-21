import { LinkProps } from 'next/link';

export interface BreadcrumbEntry {
  linkProps?: Pick<LinkProps, 'href'>;
  label: string;
  active?: boolean;
}
