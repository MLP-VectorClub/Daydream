import { Argument, Mapping } from 'classnames';

export const getInlineIconClasses = (color?: string, first?: boolean, last?: boolean): Argument => {
  const classes: Mapping = {
    /* eslint-disable @typescript-eslint/naming-convention */
    'ml-2': last,
    'mr-2': first,
    /* eslint-enable @typescript-eslint/naming-convention */
  };

  if (color) classes[`text-${color}`] = color;

  return classes;
};
