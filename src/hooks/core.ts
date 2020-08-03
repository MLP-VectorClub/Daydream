import useSWR from 'swr';
import { ENDPOINTS } from 'src/utils';
import { initCsrf } from '../services/core';

const csrfFetcher = () => initCsrf().toPromise().then(r => r.status === 204);

export function useCsrf() {
  const { data } = useSWR<boolean>(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refreshInterval: 3600e3,
    revalidateOnFocus: false,
  });

  return data;
}
