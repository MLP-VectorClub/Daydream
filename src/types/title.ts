import { CoreSliceMirroredState } from 'src/store/slices';

export type TitleFactory<P> = (props: P) => CoreSliceMirroredState;
export type TitleFactoryVoid = () => CoreSliceMirroredState;
