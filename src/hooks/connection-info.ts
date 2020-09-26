import { queryCache, useQuery } from 'react-query';
import {
  GetAboutConnectionResult,
  MappedAboutConnectionResult,
  Optional,
  UnifiedErrorResponse,
  UnifiedErrorResponseTypes,
} from 'src/types';
import { ENDPOINTS, isClientSide, requestObservableToPromise } from 'src/utils';
import { aboutService } from 'src/services';

interface ServerInfoHookValue {
  serverInfo?: MappedAboutConnectionResult;
  backendDown: boolean;
  loading: boolean;
  fetching: boolean;
  makeStale: VoidFunction;
}

export const connectionFetcher = () => requestObservableToPromise(aboutService.getConnection());

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
    { enabled: isClientSide, initialData, refetchInterval: 60e3 },
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
      queryCache.invalidateQueries(key);
    },
  };
}
