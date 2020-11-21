import { requestPromiseMapper } from 'src/utils';
import { UserService } from 'src/services';

export const prefsFetcher = () => requestPromiseMapper(UserService.getPrefs());
