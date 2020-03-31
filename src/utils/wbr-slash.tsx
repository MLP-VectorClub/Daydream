export const wbrSlash: (str: string) => React.ReactNodeArray = str => str.split(/\//g).reduce((acc, c, i, arr) => {
  const items: React.ReactNodeArray = [c];
  if (i < arr.length - 1) {
    items.push(<wbr />);
  }
  return [...acc, ...items];
}, [] as React.ReactNodeArray);
