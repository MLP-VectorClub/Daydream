import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60e3,
      keepPreviousData: true,
    },
  },
});
