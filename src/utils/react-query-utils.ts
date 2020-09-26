import { Status } from 'src/types';
import { AxiosObservable } from 'axios-observable/lib/axios-observable.interface';
import { QueryStatus } from 'react-query';
import { httpResponseMapper } from 'src/utils/common';

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
      throw new Error(`Unknown query status: ${status}`);
  }
}

export function requestObservableToPromise<T>(obs: AxiosObservable<T>) {
  return obs.toPromise().then(r => r.data).catch(res => Promise.reject(httpResponseMapper(res)));
}
