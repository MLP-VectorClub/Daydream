import { Argument, Mapping } from 'classnames';

export const getInlineIconClasses = (color?: string, first?: boolean, last?: boolean): Argument => {
  const classes: Mapping = {
    'ml-2': last,
    'mr-2': first,
  };

  if (color) classes[`text-${color}`] = color;

  return classes;
};
