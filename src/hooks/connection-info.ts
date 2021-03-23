import { queryCache, useQuery } from 'react-query';
import {
  GetAboutConnectionResult,
  MappedAboutConnectionResult,
  Optional,
  UnifiedErrorResponse,
  UnifiedErrorResponseTypes,
} from 'src/types';
import { ENDPOINTS } from 'src/utils';
import { connectionFetcher } from 'src/fetchers';
import { IS_CLIENT_SIDE } from 'src/config';

export interface ServerInfoHookValue {
  serverInfo: Optional<MappedAboutConnectionResult>;
  backendDown: boolean;
  loading: boolean;
  fetching: boolean;
  makeStale: VoidFunction;
}

export function useConnectionInfo(initialData?: GetAboutConnectionResult): ServerInfoHookValue {
  const key = ENDPOINTS.CONNECTION_INFO;
  const {
    isLoading: loading,
    isFetching: fetching,
    data,
    error,
  } = useQuery<GetAboutConnectionResult, UnifiedErrorResponse>(
    key,
    connectionFetcher,
    { enabled: IS_CLIENT_SIDE, initialData, refetchInterval: 60e3 },
  );

  const serverInfo: Optional<MappedAboutConnectionResult> = data
    ? { ...data, commitDate: data && data.commitTime ? new Date(data.commitTime) : null }
    : data;

  return {
    loading,
    fetching,
    serverInfo,
    backendDown: !loading && error?.type === UnifiedErrorResponseTypes.BACKEND_DOWN,
    makeStale: () => {
      void queryCache.invalidateQueries(key);
    },
  };
}
