import { LinkProps } from 'next/link';
import { Translatable } from 'src/types/common';

export interface BreadcrumbEntry {
  linkProps?: Pick<LinkProps, 'href'>;
  label: string | Translatable;
  active?: boolean;
}
