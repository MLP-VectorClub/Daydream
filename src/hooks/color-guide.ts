import useSWR from 'swr';
import {
  GetAppearancesRequestOptionals,
  GetAppearancesResult,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  OptionalProps,
  Status,
} from '../types';
import { ENDPOINTS, requestObservableToPromise, resultToStatus } from '../utils';
import { colorGuideService } from '../services';

interface GuideHookValue extends Partial<GetAppearancesResult> {
  status: Status;
}

export type FetchUserParams = GetUsersDaUsernameRequest | GetUsersIdRequest;

export const getUserFetcherKey = (params: object | FetchUserParams) => () => {
  if ('id' in params) return ENDPOINTS.USERS_BY_ID(params);

  if ('username' in params) return ENDPOINTS.USERS_BY_USERNAME(params);

  throw new Error('getUserFetcherKey: Invalid params parameter for');
};

type Params = OptionalProps<GetAppearancesRequestOptionals, 'guide'>;

export const guideFetcher = (params: Params) => () => {
  if (!params.guide) return Promise.resolve(undefined);

  return requestObservableToPromise(colorGuideService.getAppearances(params as GetAppearancesRequestOptionals));
};

export function useGuide(params: Params, initialData?: GetAppearancesResult): GuideHookValue {
  const { data, error: guideError } = useSWR<GetAppearancesResult | undefined>(
    () => {
      if (!params.guide) return null;

      return ENDPOINTS.APPEARANCES(params as GetAppearancesRequestOptionals);
    },
    guideFetcher(params),
    { initialData },
  );

  return {
    ...data,
    status: resultToStatus(data, guideError),
  };
}
