import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetUsefulLinksSidebarResult } from 'src/types';
import { Service } from 'src/services/service-class';

export class CoreService extends Service {
  static initCsrf = () => Axios.get<void>(ENDPOINTS.CSRF_INIT);

  static getSidebarUsefulLinks = () => Axios.get<GetUsefulLinksSidebarResult>(ENDPOINTS.USEFUL_LINKS_SIDEBAR);
}
