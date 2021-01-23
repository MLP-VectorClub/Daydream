import { requestPromiseMapper } from 'src/utils';
import { GetShowRequest } from 'src/types';
import { ShowService } from 'src/services';

export const showListFetcher = (params: GetShowRequest) => () => requestPromiseMapper(ShowService.getIndex(params));
