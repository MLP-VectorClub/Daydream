import { useQuery } from 'react-query';
import {
  GetAppearancesAllRequest,
  GetAppearancesAllResult,
  GetAppearancesAutocompleteRequest,
  GetAppearancesAutocompleteResult,
  GetAppearancesPinnedRequest,
  GetAppearancesPinnedResult,
  GetAppearancesRequest,
  GetAppearancesResult,
  GetColorGuidesResult,
  Status,
} from 'src/types';
import { ENDPOINTS, mapQueryStatus } from 'src/utils';
import {
  fullGuideFetcher,
  FullGuideFetcherParams,
  guideAutocompleteFetcher,
  GuideAutocompleteFetcherParams,
  guideFetcher,
  GuideFetcherParams,
  guideIndexFetcher,
  pinnedAppearancesFetcher,
  PinnedAppearancesFetcherParams,
} from 'src/fetchers';
import { useCallback } from 'react';

interface GuideHookValue extends Partial<GetAppearancesResult> {
  status: Status;
}

export function useGuide(params: GuideFetcherParams, initialData?: GetAppearancesResult): GuideHookValue {
  const fetcher = useCallback(() => guideFetcher(params)(), [params]);
  const { status, data } = useQuery(
    ENDPOINTS.APPEARANCES(params as GetAppearancesRequest),
    fetcher,
    { enabled: params.guide, initialData },
  );

  return {
    ...data,
    status: mapQueryStatus(status),
  };
}

interface GuideAutocompleteHookValue {
  results?: GetAppearancesAutocompleteResult,
  status: Status;
}

export function useGuideAutocomplete(params: GuideAutocompleteFetcherParams): GuideAutocompleteHookValue {
  const fetcher = useCallback(() => guideAutocompleteFetcher(params)(), [params]);
  const { status, data } = useQuery(
    ENDPOINTS.APPEARANCES_AUTOCOMPLETE(params as GetAppearancesAutocompleteRequest),
    fetcher,
    { enabled: params.guide && params.q },
  );

  return {
    results: data,
    status: mapQueryStatus(status),
  };
}

export function useGuideIndex(initialData?: GetColorGuidesResult) {
  const fetcher = useCallback(() => guideIndexFetcher()(), []);
  const { data } = useQuery(
    ENDPOINTS.GUIDE_INDEX,
    fetcher,
    { initialData },
  );

  return data;
}

export function useFullGuide(params: FullGuideFetcherParams, initialData?: GetAppearancesAllResult) {
  const fetcher = useCallback(() => fullGuideFetcher(params)(), [params]);
  const { data, status } = useQuery(
    ENDPOINTS.APPEARANCES_FULL(params as GetAppearancesAllRequest),
    fetcher,
    { enabled: params.guide, initialData },
  );

  return {
    appearances: data?.appearances,
    groups: data?.groups,
    status: mapQueryStatus(status),
  };
}

export function usePinnedAppearances(params: PinnedAppearancesFetcherParams, initialData?: GetAppearancesPinnedResult) {
  const fetcher = useCallback(() => pinnedAppearancesFetcher(params)(), [params]);
  const { data } = useQuery(
    ENDPOINTS.APPEARANCES_PINNED(params as GetAppearancesPinnedRequest),
    fetcher,
    { initialData },
  );

  return data;
}
