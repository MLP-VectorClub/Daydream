import Axios from 'axios-observable';
import { GetAppearancesRequestOptionals, GetAppearancesResult } from 'src/types';
import { ENDPOINTS } from 'src/utils';

export const getAppearances = (data: GetAppearancesRequestOptionals) =>
  Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data));
