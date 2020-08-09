import { Status } from 'src/types';
import { AxiosObservable } from 'axios-observable/lib/axios-observable.interface';
import { QueryStatus } from 'react-query';
import { httpResponseMapper } from './common';

export function mapQueryStatus(status: QueryStatus) {
  switch (status) {
    case QueryStatus.Idle:
      return Status.INIT;
    case QueryStatus.Loading:
      return Status.LOAD;
    case QueryStatus.Success:
      return Status.SUCCESS;
    case QueryStatus.Error:
      return Status.FAILURE;
    default:
      throw new Error(`Unknown query status: ${status}`);
  }
}

export function requestObservableToPromise<T>(obs: AxiosObservable<T>) {
  return obs.toPromise().then(r => r.data).catch(res => Promise.reject(httpResponseMapper(res)));
}
