import Axios from 'axios';
import { GetAppearancesRequestOptionals, GetAppearancesResult, GetColorGuidesResult } from 'src/types';
import { ENDPOINTS } from 'src/utils';

export class ColorGuideService {
  static getAppearances = (data: GetAppearancesRequestOptionals) =>
    Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data));

  static getIndexData = () =>
    Axios.get<GetColorGuidesResult>(ENDPOINTS.GUIDE_INDEX);
}
