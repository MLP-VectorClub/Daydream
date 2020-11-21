import { GetAppearancesAllRequest, GetAppearancesRequestOptionals, NullableProps } from 'src/types';
import { requestPromiseMapper } from 'src/utils';
import { ColorGuideService } from 'src/services';

export type GuideFetcherParams = NullableProps<GetAppearancesRequestOptionals, 'guide'>;

export const guideFetcher = (params: GuideFetcherParams) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestPromiseMapper(ColorGuideService.getAppearances(params as GetAppearancesRequestOptionals));
};

export type FullGuideFetcherParams = NullableProps<GetAppearancesAllRequest, 'guide'>;

export const fullGuideFetcher = (params: FullGuideFetcherParams) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestPromiseMapper(ColorGuideService.getFullList(params as GetAppearancesAllRequest));
};
