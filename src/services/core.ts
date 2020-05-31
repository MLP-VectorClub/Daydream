import Axios from 'axios-observable';
import { ENDPOINTS } from '../utils';

export const initCsrf = () => Axios.get<void>(ENDPOINTS.CSRF_INIT);
