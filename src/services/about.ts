import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetAboutConnectionResult, GetAboutMembersResult } from 'src/types';

export class AboutService {
  static getConnection = () => Axios.get<GetAboutConnectionResult>(ENDPOINTS.CONNECTION_INFO);

  static getMembers = () => Axios.get<GetAboutMembersResult>(ENDPOINTS.MEMBERS);
}
