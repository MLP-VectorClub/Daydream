import { NullableProps } from 'src/types';
import {
  GetAppearancesAllRequest,
  GetAppearancesAutocompleteRequest,
  GetAppearancesIdLocateRequest,
  GetAppearancesIdRequest,
  GetAppearancesPinnedRequest,
  GetAppearancesRequest,
  GetColorGuideMajorChangesRequest,
} from '@mlp-vectorclub/api-types';
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

export type MajorChangesFetcherParams = NullableProps<GetColorGuideMajorChangesRequest, 'guide'>;

export const majorChangesFetcher = (params: MajorChangesFetcherParams, req?: IncomingMessage) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getMajorChanges(params as GetColorGuideMajorChangesRequest));
};

export type AppearanceLocationFetcherParams = GetAppearancesIdLocateRequest;

export const appearanceLocationFetcher = (params: AppearanceLocationFetcherParams, req?: IncomingMessage) => () => {
  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getAppearanceLocation(params));
};

export type AppearanceFetcherParams = NullableProps<GetAppearancesIdRequest, 'id'>;

export const appearanceFetcher = (params: AppearanceFetcherParams, req?: IncomingMessage) => () => {
  if (typeof params.id !== 'number') return Promise.resolve(undefined);

  const service: ColorGuideService = req ? new ColorGuideService(req) : defaultServices.colorGuide;

  return requestPromiseMapper(service.getAppearance(params as GetAppearancesIdRequest));
};
