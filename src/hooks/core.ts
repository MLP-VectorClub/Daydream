import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { getSidebarUsefulLinks, initCsrf } from 'src/services/core';

const csrfFetcher = () => initCsrf().toPromise().then(r => r.status === 204);

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refetchInterval: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}

const usefulLinksFetcher = () => getSidebarUsefulLinks().toPromise().then(r => r.data);

export function useSidebarUsefulLinks(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USEFUL_LINKS_SIDEBAR, usefulLinksFetcher, { enabled });

  return data;
}
