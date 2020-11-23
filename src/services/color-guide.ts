import Axios from 'axios';
import {
  GetAppearancesAllRequest,
  GetAppearancesAllResult,
  GetAppearancesRequest,
  GetAppearancesResult,
  GetColorGuidesResult,
} from 'src/types';
import { ENDPOINTS } from 'src/utils';
import { Service } from 'src/services/service-class';

export class ColorGuideService extends Service {
  getAppearances = (data: GetAppearancesRequest) =>
    Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data), this.getRequestOptions());

  getIndexData = () =>
    Axios.get<GetColorGuidesResult>(ENDPOINTS.GUIDE_INDEX, this.getRequestOptions());

  getFullList = (data: GetAppearancesAllRequest) =>
    Axios.get<GetAppearancesAllResult>(ENDPOINTS.APPEARANCES_FULL(data), this.getRequestOptions());
}
