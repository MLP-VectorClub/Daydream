import Axios from 'axios-observable';
import { ENDPOINTS } from '../utils';
import { GetAboutConnectionResult } from '../types';

export const getConnection = () => Axios.get<GetAboutConnectionResult>(ENDPOINTS.CONNECTION_INFO);
