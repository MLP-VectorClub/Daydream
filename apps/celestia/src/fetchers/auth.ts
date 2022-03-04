import { requestPromiseMapper } from 'src/utils';
import { UserService } from 'src/services';

export const currentUserFetcher = () => requestPromiseMapper(UserService.getMe());
