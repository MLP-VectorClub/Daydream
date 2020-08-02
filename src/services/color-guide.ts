import Axios from 'axios-observable';
import { GetAppearancesRequestOptionals, GetAppearancesResult } from '../types';
import { ENDPOINTS } from '../utils';

export const getAppearances = (data: GetAppearancesRequestOptionals) =>
  Axios.get<GetAppearancesResult>(ENDPOINTS.APPEARANCES(data));
