import { useQuery } from 'react-query';
import { Status } from 'src/types';
import {
  GetAppearancesAllRequest,
  GetAppearancesAllResult,
  GetAppearancesAutocompleteRequest,
  GetAppearancesAutocompleteResult,
  GetAppearancesIdLocateRequest,
  GetAppearancesIdLocateResult,
  GetAppearancesIdRequest,
  GetAppearancesIdResult,
  GetAppearancesPinnedRequest,
  GetAppearancesPinnedResult,
  GetAppearancesRequest,
  GetAppearancesResult,
  GetColorGuideMajorChangesRequest,
  GetColorGuideMajorChangesResult,
  GetColorGuideResult,
} from '@mlp-vectorclub/api-types';
import { ENDPOINTS, mapQueryStatus } from 'src/utils';
import {
  appearanceFetcher,
  AppearanceFetcherParams,
  appearanceLocationFetcher,
  AppearanceLocationFetcherParams,
  fullGuideFetcher,
  FullGuideFetcherParams,
  guideAutocompleteFetcher,
  GuideAutocompleteFetcherParams,
  guideFetcher,
  GuideFetcherParams,
  guideIndexFetcher,
  majorChangesFetcher,
  MajorChangesFetcherParams,
  pinnedAppearancesFetcher,
  PinnedAppearancesFetcherParams,
} from 'src/fetchers';
import { useCallback } from 'react';

interface GuideHookValue extends Partial<GetAppearancesResult> {
  status: Status;
}

export function useGuide(params: GuideFetcherParams, initialData?: GetAppearancesResult): GuideHookValue {
  const fetcher = useCallback(() => guideFetcher(params)(), [params]);
  const { status, data } = useQuery(ENDPOINTS.APPEARANCES(params as GetAppearancesRequest), fetcher, {
    enabled: Boolean(params.guide),
    initialData,
  });

  return {
    ...data,
    status: mapQueryStatus(status),
  };
}

interface GuideAutocompleteHookValue {
  results?: GetAppearancesAutocompleteResult;
  status: Status;
}

export function useGuideAutocomplete(params: GuideAutocompleteFetcherParams): GuideAutocompleteHookValue {
  const fetcher = useCallback(() => guideAutocompleteFetcher(params)(), [params]);
  const haveQuery = Boolean(params.q && params.q.length > 0);
  const { status, data } = useQuery(ENDPOINTS.APPEARANCES_AUTOCOMPLETE(params as GetAppearancesAutocompleteRequest), fetcher, {
    enabled: Boolean(params.guide && haveQuery),
    keepPreviousData: haveQuery,
  });

  return {
    results: data,
    status: mapQueryStatus(status),
  };
}

export function useGuideIndex(initialData?: GetColorGuideResult) {
  const fetcher = useCallback(() => guideIndexFetcher()(), []);
  const { data } = useQuery(ENDPOINTS.GUIDE_INDEX, fetcher, { initialData });

  return data;
}

export function useFullGuide(params: FullGuideFetcherParams, initialData?: GetAppearancesAllResult) {
  const fetcher = useCallback(() => fullGuideFetcher(params)(), [params]);
  const { data, status } = useQuery(ENDPOINTS.APPEARANCES_FULL(params as GetAppearancesAllRequest), fetcher, {
    enabled: Boolean(params.guide),
    initialData,
  });

  return {
    appearances: data?.appearances,
    groups: data?.groups,
    status: mapQueryStatus(status),
  };
}

export function usePinnedAppearances(params: PinnedAppearancesFetcherParams, initialData?: GetAppearancesPinnedResult) {
  const fetcher = useCallback(() => pinnedAppearancesFetcher(params)(), [params]);
  const { data } = useQuery(ENDPOINTS.APPEARANCES_PINNED(params as GetAppearancesPinnedRequest), fetcher, { initialData });

  return data;
}

interface MajorChangesHookValue extends Partial<GetColorGuideMajorChangesResult> {
  status: Status;
}

export function useMajorChanges(params: MajorChangesFetcherParams, initialData?: GetColorGuideMajorChangesResult): MajorChangesHookValue {
  const fetcher = useCallback(() => majorChangesFetcher(params)(), [params]);
  const { data, status } = useQuery(ENDPOINTS.GUIDE_MAJOR_CHANGES(params as GetColorGuideMajorChangesRequest), fetcher, { initialData });

  return {
    ...data,
    status: mapQueryStatus(status),
  };
}

interface AppearanceLocationHookValue {
  status: Status;
  appearance?: GetAppearancesIdLocateResult;
}

export function useAppearanceLocation(
  params: AppearanceLocationFetcherParams,
  initialData?: GetAppearancesIdLocateResult
): AppearanceLocationHookValue {
  const fetcher = useCallback(() => appearanceLocationFetcher(params)(), [params]);
  const { data, status } = useQuery(ENDPOINTS.APPEARANCE_LOCATE(params as GetAppearancesIdLocateRequest), fetcher, {
    enabled: Boolean(params.id),
    initialData,
  });

  return {
    appearance: data,
    status: mapQueryStatus(status),
  };
}

interface DetailedAppearanceHookValue {
  status: Status;
  appearance?: GetAppearancesIdResult;
}

export function useDetailedAppearance(params: AppearanceFetcherParams, initialData?: GetAppearancesIdResult): DetailedAppearanceHookValue {
  const fetcher = useCallback(() => appearanceFetcher(params)(), [params]);
  const { data, status } = useQuery(ENDPOINTS.APPEARANCE(params as GetAppearancesIdRequest), fetcher, {
    enabled: Boolean(params.id),
    initialData,
  });

  return {
    appearance: data,
    status: mapQueryStatus(status),
  };
}
