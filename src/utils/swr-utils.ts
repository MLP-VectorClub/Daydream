import { Status } from 'src/types';
import { AxiosObservable } from 'axios-observable/lib/axios-observable.interface';

export function resultToStatus<D = unknown, E = unknown>(data: D, error: E) {
  if (error) {
    return Status.FAILURE;
  }

  if (typeof data === 'undefined') {
    return Status.LOAD;
  }

  return Status.SUCCESS;
}

export function requestObservableToPromise<T>(obs: AxiosObservable<T>): Promise<T> {
  return obs.toPromise().then(r => r.data);
}
