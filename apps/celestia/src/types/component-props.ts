import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

/**
 * @file This file is meant to house component props that could not live inside the component file due
 *       to causing a dependency cycle
 */

export type InlineIconProps = {
  icon?: IconProp;
  loading?: boolean;
  last?: boolean;
  first?: boolean;
  color?: string;
  children?: never;
} & Omit<FontAwesomeIconProps, 'icon'>;
