import { coreActions, CoreSliceMirroredState } from 'src/store/slices';
import { AppDispatch } from 'src/store';

export const titleSetter = (store: { dispatch: AppDispatch }, { title, breadcrumbs }: Partial<CoreSliceMirroredState>) => {
  if (typeof title !== 'undefined') store.dispatch(coreActions.setTitle(title));
  if (typeof breadcrumbs !== 'undefined') store.dispatch(coreActions.setBreadcrumbs(breadcrumbs));
};
