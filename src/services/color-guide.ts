import Axios from 'axios';
import {
  GetAppearancesAllRequest,
  GetAppearancesAllResult,
  GetAppearancesRequestOptionals,
  GetAppearancesResult,
  GetColorGuidesResult,
} from 'src/types';
import { ENDPOINTS } from 'src/utils';
import { Service } from 'src/services/service-class';

export class ColorGuideService extends Service {
  static getAppearances = (data: GetAppearancesRequestOptionals) =>
    Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data));

  static getIndexData = () =>
    Axios.get<GetColorGuidesResult>(ENDPOINTS.GUIDE_INDEX);

  static getFullList = (data: GetAppearancesAllRequest) =>
    Axios.get<GetAppearancesAllResult>(ENDPOINTS.APPEARANCES_FULL(data));
}
