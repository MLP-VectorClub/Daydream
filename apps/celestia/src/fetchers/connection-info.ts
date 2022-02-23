import { requestPromiseMapper } from 'src/utils';
import { AboutService } from 'src/services';

export const connectionFetcher = () => requestPromiseMapper(AboutService.getConnection());
