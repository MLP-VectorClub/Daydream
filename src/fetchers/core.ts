import { requestPromiseMapper } from 'src/utils';
import { CoreService } from 'src/services';

export const csrfFetcher = () => CoreService.initCsrf().then(r => r.status === 204);

export const usefulLinksFetcher = () => requestPromiseMapper(CoreService.getSidebarUsefulLinks());
