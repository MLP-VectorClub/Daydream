import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { rootReducer, RootState } from 'src/store/rootReducer';

const createStore = () => configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type WithNamespacesRequired = { namespacesRequired: string[] };

// create a makeStore function
const makeStore: MakeStore<RootState> = () => createStore();

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore);
