import { useQuery } from 'react-query';
import {
  GetAboutConnectionResult,
  MappedAboutConnectionResult,
  Optional,
  UnifiedErrorResponse,
  UnifiedErrorResponseTypes,
} from '../types';
import { ENDPOINTS, isClientSide, requestObservableToPromise } from '../utils';
import { aboutService } from '../services';

interface ServerInfoHookValue {
  serverInfo?: MappedAboutConnectionResult;
  backendDown: boolean;
  loading: boolean;
}

export const connectionFetcher = () => requestObservableToPromise(aboutService.getConnection());

export function useConnectionInfo(initialData?: GetAboutConnectionResult): ServerInfoHookValue {
  const {
    isLoading: loading,
    data,
    error,
  } = useQuery<GetAboutConnectionResult, typeof ENDPOINTS.CONNECTION_INFO, UnifiedErrorResponse>(
    ENDPOINTS.CONNECTION_INFO,
    connectionFetcher,
    { enabled: isClientSide, initialData, refetchInterval: 60e3 },
  );

  const serverInfo: Optional<MappedAboutConnectionResult> = data
    ? { ...data, commitDate: data && data.commitTime ? new Date(data.commitTime) : null }
    : data;

  return {
    loading,
    serverInfo,
    backendDown: !loading && error?.type === UnifiedErrorResponseTypes.BACKEND_DOWN,
  };
}
