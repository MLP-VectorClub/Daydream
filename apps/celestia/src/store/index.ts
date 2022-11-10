import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { rootReducer } from 'src/store/rootReducer';
import { queryClient } from 'src/store/queryClient';
import { useDispatch } from 'react-redux';
import { WithAppThunkExtra } from 'src/store/thunkTypes';

const createStore = () => {
  const extraArgument: WithAppThunkExtra['extra'] = {
    queryCache: queryClient,
  };
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
  });
};

type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = () => createStore();

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: false,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
