import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetUsefulLinksSidebarResult } from 'src/types';

export class CoreService {
  static initCsrf = () => Axios.get<void>(ENDPOINTS.CSRF_INIT);

  static getSidebarUsefulLinks = () => Axios.get<GetUsefulLinksSidebarResult>(ENDPOINTS.USEFUL_LINKS_SIDEBAR);
}
