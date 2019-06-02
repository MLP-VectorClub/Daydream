import { GetAllAppearancesRequest } from 'app/types';
import * as buildUrl from 'build-url';
import { mapValues } from 'lodash';
import { API_PREFIX } from 'src/app/app.config';

const addApiPrefix = endpoints => mapValues(endpoints, path => typeof path === 'string' ? API_PREFIX + path : path);

const APPEARANCES = (params: GetAllAppearancesRequest) =>
  buildUrl(null, {
    path: `${API_PREFIX}/appearances`,
    queryParams: mapValues(params, String),
  });

export const ENDPOINTS = addApiPrefix({
  APPEARANCES,
  USERS_ME: '/users/me',
});
