import {
  GetAppearancesAllRequest,
  GetAppearancesAutocompleteRequest,
  GetAppearancesPinnedRequest,
  GetAppearancesRequest,
  NullableProps,
} from 'src/types';
import { requestPromiseMapper } from 'src/utils';
import { ColorGuideService, defaultServices } from 'src/services';
import { IncomingMessage } from 'http';

export type GuideFetcherParams = NullableProps<GetAppearancesRequest, 'guide'>;

export const guideFetcher = (params: GuideFetcherParams, req?: IncomingMessage) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getAppearances(params as GetAppearancesRequest));
};

export type GuideAutocompleteFetcherParams = Omit<NullableProps<GetAppearancesAutocompleteRequest, 'guide'>, 'size'>;

export const guideAutocompleteFetcher = (params: GuideAutocompleteFetcherParams, req?: IncomingMessage) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getAutocompleteAppearances(params as GetAppearancesAutocompleteRequest));
};

export type FullGuideFetcherParams = NullableProps<GetAppearancesAllRequest, 'guide'>;

export const fullGuideFetcher = (params: FullGuideFetcherParams, req?: IncomingMessage) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getFullList(params as GetAppearancesAllRequest));
};

export const guideIndexFetcher = (req?: IncomingMessage) => () => {
  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getIndexData());
};

export type PinnedAppearancesFetcherParams = NullableProps<GetAppearancesPinnedRequest, 'guide'>;

export const pinnedAppearancesFetcher = (params: PinnedAppearancesFetcherParams, req?: IncomingMessage) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getPinnedAppearances(params as GetAppearancesPinnedRequest));
};
