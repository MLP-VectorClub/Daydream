import Axios from 'axios';
import { ENDPOINTS } from 'src/utils';
import { GetAboutConnectionResult, GetAboutMembersResult } from '@mlp-vectorclub/api-types';
import { Service } from 'src/services/service-class';

export class AboutService extends Service {
  static getConnection = () => Axios.get<GetAboutConnectionResult>(ENDPOINTS.CONNECTION_INFO);

  static getMembers = () => Axios.get<GetAboutMembersResult>(ENDPOINTS.MEMBERS);
}
