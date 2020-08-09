import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { initCsrf } from '../services/core';

const csrfFetcher = () => initCsrf().toPromise().then(r => r.status === 204);

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refetchInterval: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}
