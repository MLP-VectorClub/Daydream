import { Status } from 'src/types';
import { QueryStatus } from 'react-query';
import { httpResponseMapper } from 'src/utils/common';
import { AxiosResponse } from 'axios';

export function mapQueryStatus(status: QueryStatus) {
  switch (status) {
    case 'idle':
      return Status.INIT;
    case 'loading':
      return Status.LOAD;
    case 'success':
      return Status.SUCCESS;
    case 'error':
      return Status.FAILURE;
    default:
      throw new Error(`Unknown query status: ${String(status)}`);
  }
}

export function requestPromiseMapper<T>(promise: Promise<AxiosResponse<T>>) {
  return promise.then((r) => r.data).catch((res: unknown) => Promise.reject(httpResponseMapper(res)));
}
