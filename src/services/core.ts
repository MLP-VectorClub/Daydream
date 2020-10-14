import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetUsefulLinksSidebarResult } from 'src/types';

export const initCsrf = () => Axios.get<void>(ENDPOINTS.CSRF_INIT);

export const getSidebarUsefulLinks = () => Axios.get<GetUsefulLinksSidebarResult>(ENDPOINTS.USEFUL_LINKS_SIDEBAR);
