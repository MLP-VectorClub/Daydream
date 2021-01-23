import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetShowRequest, GetShowResult } from 'src/types';
import { Service } from 'src/services/service-class';

export class ShowService extends Service {
  static getIndex = (data: GetShowRequest) => Axios.get<GetShowResult>(ENDPOINTS.SHOW(data));
}
