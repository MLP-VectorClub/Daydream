import { requestPromiseMapper } from 'src/utils';
import { AboutService, UserService } from 'src/services';

export const membersFetcher = () => requestPromiseMapper(AboutService.getMembers());

export const usersFetcher = () => requestPromiseMapper(UserService.getList());
