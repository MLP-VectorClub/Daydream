import Axios from 'axios-observable';
import { ENDPOINTS } from 'src/utils';
import { GetAboutConnectionResult } from 'src/types';

export const getConnection = () => Axios.get<GetAboutConnectionResult>(ENDPOINTS.CONNECTION_INFO);
