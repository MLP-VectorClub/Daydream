import { LinkProps } from 'next/link';

export interface BreadcrumbEntry {
  linkProps?: Pick<LinkProps, 'href' | 'as'>;
  label: string;
  active?: boolean;
}
