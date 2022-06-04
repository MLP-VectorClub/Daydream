import { requestPromiseMapper } from 'src/utils';
import { defaultServices, UserService } from 'src/services';
import { IncomingMessage } from 'http';
import { GetUserPrefsMeRequest, UserPrefs } from '@mlp-vectorclub/api-types';

// eslint-disable-next-line max-len
export function prefsFetcher<K extends NonNullable<GetUserPrefsMeRequest['keys']>>(
  data?: { keys: K },
  req?: IncomingMessage
): () => Promise<Pick<UserPrefs, K[number]>>;

export function prefsFetcher(data?: GetUserPrefsMeRequest, req?: IncomingMessage) {
  return () => {
    const service = req ? new UserService(req) : defaultServices.user;
    return requestPromiseMapper(service.getPrefs(data));
  };
}
