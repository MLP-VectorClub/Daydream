import { CoreSliceMirroredState } from 'src/store/slices';

/**
 * Hack used to create a unique non-replicable type
 */
declare const localSymbol: unique symbol;
type TitleFactoryDefaultProps = typeof localSymbol;

/**
 * If no type argument is provided, then assumes no props will be passed, requires props otherwise
 */
export type TitleFactory<P = TitleFactoryDefaultProps> = P extends TitleFactoryDefaultProps
  ? () => CoreSliceMirroredState
  : (props: P) => CoreSliceMirroredState;
