import { ENDPOINTS, requestPromiseMapper } from 'src/utils';
import { useQuery } from 'react-query';
import { CoreService } from 'src/services';

const csrfFetcher = () => CoreService.initCsrf().then(r => r.status === 204);

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refetchInterval: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}

const usefulLinksFetcher = () => requestPromiseMapper(CoreService.getSidebarUsefulLinks());

export function useSidebarUsefulLinks(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USEFUL_LINKS_SIDEBAR, usefulLinksFetcher, { enabled });

  return enabled ? data : undefined;
}
