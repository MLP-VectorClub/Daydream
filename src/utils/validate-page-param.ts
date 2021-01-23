export const validatePageParam = (pageParamValue: unknown, defaultValue = 1): number => {
  if (typeof pageParamValue === 'string') {
    const intPage = parseInt(pageParamValue, 10);
    if (!isNaN(intPage) && isFinite(intPage) && intPage > 0) {
      return intPage;
    }
  }

  return defaultValue;
};
