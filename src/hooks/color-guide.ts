import { useQuery } from 'react-query';
import {
  GetAppearancesAllRequest,
  GetAppearancesAllResult,
  GetAppearancesRequestOptionals,
  GetAppearancesResult,
  GetColorGuidesResult,
  NullableProps,
  Status,
} from 'src/types';
import { ENDPOINTS, mapQueryStatus, requestPromiseMapper } from 'src/utils';
import { ColorGuideService } from 'src/services';

interface GuideHookValue extends Partial<GetAppearancesResult> {
  status: Status;
}

type GuideFetcherParams = NullableProps<GetAppearancesRequestOptionals, 'guide'>;

export const guideFetcher = (params: GuideFetcherParams) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestPromiseMapper(ColorGuideService.getAppearances(params as GetAppearancesRequestOptionals));
};

export function useGuide(params: GuideFetcherParams, initialData?: GetAppearancesResult): GuideHookValue {
  const { status, data } = useQuery(
    ENDPOINTS.APPEARANCES(params as GetAppearancesRequestOptionals),
    guideFetcher(params),
    { enabled: params.guide, initialData },
  );

  return {
    ...data,
    status: mapQueryStatus(status),
  };
}

export const guideIndexFetcher = () =>
  requestPromiseMapper(ColorGuideService.getIndexData());

export function useGuideIndex(initialData?: GetColorGuidesResult) {
  const { data } = useQuery(
    ENDPOINTS.GUIDE_INDEX,
    guideIndexFetcher,
    { initialData },
  );

  return data;
}

type FullGuideFetcherParams = NullableProps<GetAppearancesAllRequest, 'guide'>;

export const fullGuideFetcher = (params: FullGuideFetcherParams) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestPromiseMapper(ColorGuideService.getFullList(params as GetAppearancesAllRequest));
};

export function useFullGuide(params: FullGuideFetcherParams, initialData?: GetAppearancesAllResult) {
  const { data, status } = useQuery(
    ENDPOINTS.APPEARANCES_FULL(params as GetAppearancesAllRequest),
    fullGuideFetcher(params),
    { enabled: params.guide, initialData },
  );

  return {
    appearances: data?.appearances,
    groups: data?.groups,
    status: mapQueryStatus(status),
  };
}
