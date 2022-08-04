import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { csrfFetcher, usefulLinksFetcher } from 'src/fetchers';
import { useCallback, useEffect } from 'react';
import { CoreSliceMirroredState } from 'src/store/slices';
import { titleSetter } from 'src/utils/core';
import { AppDispatch } from 'src/store';
import { TFunction, useTranslation } from 'next-i18next';
import { PageTitle, Translatable } from 'src/types';

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    staleTime: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}

export function useSidebarUsefulLinks(enabled: boolean) {
  const fetcher = useCallback(() => usefulLinksFetcher()(), []);
  const { data } = useQuery(ENDPOINTS.USEFUL_LINKS_SIDEBAR, fetcher, {
    enabled,
  });

  return enabled ? data : undefined;
}

export const isTranslatable = (value: Translatable | unknown): value is Translatable => {
  if (typeof value === 'string' || value === null) return false;

  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'string';
};

export const translatableValue = (t: TFunction, value: PageTitle): string => (isTranslatable(value) ? t(value[0], value[1]) : value || '');

export const useTitleSetter = (dispatch: AppDispatch, { title, breadcrumbs }: CoreSliceMirroredState): void => {
  const { t } = useTranslation();
  useEffect(() => {
    titleSetter({ dispatch }, { title: translatableValue(t, title) });
  }, [title, dispatch, t]);

  useEffect(() => {
    titleSetter(
      { dispatch },
      {
        breadcrumbs: breadcrumbs.map((crumb) => ({
          ...crumb,
          label: translatableValue(t, crumb.label),
        })),
      }
    );
  }, [breadcrumbs, dispatch, t]);
};
