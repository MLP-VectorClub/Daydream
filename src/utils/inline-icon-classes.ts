import { ClassValue } from 'classnames/types';

export const getInlineIconClasses = (color?: string, first?: boolean, last?: boolean): ClassValue => ({
  'ml-2': last,
  'mr-2': first,
  [`text-${color}`]: color,
});
