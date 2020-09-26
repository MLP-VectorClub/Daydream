import { useQuery } from 'react-query';
import { GetAppearancesRequestOptionals, GetAppearancesResult, NullableProps, Status } from 'src/types';
import { ENDPOINTS, mapQueryStatus, requestObservableToPromise } from 'src/utils';
import { colorGuideService } from 'src/services';

interface GuideHookValue extends Partial<GetAppearancesResult> {
  status: Status;
}

type Params = NullableProps<GetAppearancesRequestOptionals, 'guide'>;

export const guideFetcher = (params: Params) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestObservableToPromise(colorGuideService.getAppearances(params as GetAppearancesRequestOptionals));
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
