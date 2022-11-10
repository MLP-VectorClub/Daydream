import { CSSProperties, FC, memo, PropsWithChildren, useMemo } from 'react';

const ResponsiveContainerComponent: FC<PropsWithChildren<{ width: number; height: number } | { size: number }>> = ({
  children,
  ...rest
}) => {
  const width = 'size' in rest ? rest.size : rest.width;
  const height = 'size' in rest ? rest.size : rest.height;
  const styles: CSSProperties = useMemo(
    () => ({
      position: 'relative',
      width: '100%',
      paddingTop: `${(height / width) * 100}%`,
    }),
    [height, width]
  );
  return <div style={styles}>{children}</div>;
};

export const ResponsiveContainer = memo(ResponsiveContainerComponent);
