import { QueryClient } from 'react-query';

export interface WithAppThunkExtra {
  extra: {
    queryCache: QueryClient;
  };
}
