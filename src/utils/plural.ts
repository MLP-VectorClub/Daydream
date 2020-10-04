export const plural = (
  count = 0,
  singularValue: string,
  pluralValue: string,
  prepend = true,
): string => {
  const value = count === 1 ? singularValue : pluralValue;

  if (prepend) return `${count} ${value}`;

  return value;
};
