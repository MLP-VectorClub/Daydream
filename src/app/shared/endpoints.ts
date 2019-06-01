import { API_PREFIX } from 'src/app/app.config';
import { mapValues } from 'lodash';

const addApiPrefix = endpoints => mapValues(endpoints, path => API_PREFIX + path);

export const ENDPOINTS: { [key: string]: string } = addApiPrefix({
  APPEARANCES: '/appearances',
  USERS_ME: '/users/me',
});
