import { requestPromiseMapper } from 'src/utils';
import { CoreService, defaultServices } from 'src/services';
import { IncomingMessage } from 'http';

export const csrfFetcher = () => CoreService.initCsrf().then((r) => r.status === 204);

export const usefulLinksFetcher = (req?: IncomingMessage) => () => {
  const service = req ? new CoreService(req) : defaultServices.core;
  return requestPromiseMapper(service.getSidebarUsefulLinks());
};
