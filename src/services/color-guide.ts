import Axios from 'axios-observable';
import { GetAppearancesRequestOptionals, GetAppearancesResult, GetColorGuidesResult } from 'src/types';
import { ENDPOINTS } from 'src/utils';

export const getAppearances = (data: GetAppearancesRequestOptionals) =>
  Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data));

export const getIndexData = () =>
  Axios.get<GetColorGuidesResult>(ENDPOINTS.GUIDE_INDEX);
