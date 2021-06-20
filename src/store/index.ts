import { configureStore, getDefaultMiddleware, Store, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { rootReducer, RootState } from 'src/store/rootReducer';

const createStore = () => configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

export type AppStore = ReturnType<typeof createStore>;
export type AppActions = Parameters<typeof rootReducer>[1];
export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = () => createStore();

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: false });
