import { useQuery } from 'react-query';
import {
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

type Params = NullableProps<GetAppearancesRequestOptionals, 'guide'>;

export const guideFetcher = (params: Params) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestPromiseMapper(ColorGuideService.getAppearances(params as GetAppearancesRequestOptionals));
};

export function useGuide(params: Params, initialData?: GetAppearancesResult): GuideHookValue {
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

export const guideIndexDataFetcher = () =>
  requestPromiseMapper(ColorGuideService.getIndexData());

export function useGuideIndexData(initialData?: GetColorGuidesResult) {
  const { data } = useQuery(
    ENDPOINTS.GUIDE_INDEX,
    guideIndexDataFetcher,
    { initialData },
  );

  return data;
}
