import { BreadcrumbEntry } from 'src/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { coreActions } from 'src/store/slices';

export const useBreadcrumbs = (entries: BreadcrumbEntry[]) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coreActions.setBreadcrumbs(entries));

    return () => {
      dispatch(coreActions.resetBreadcrumbs());
    };
  }, []);
};
