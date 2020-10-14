import { ClassValue } from 'classnames/types';

export const getInlineIconClasses = (color?: string, first?: boolean, last?: boolean): ClassValue => {
  const classes: ClassValue = {
    'ml-2': last,
    'mr-2': first,
  };

  if (color) classes[`text-${color}`] = color;

  return classes;
};
