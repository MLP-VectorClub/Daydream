import { configureStore, getDefaultMiddleware, ThunkDispatch } from '@reduxjs/toolkit';
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
const makeStore: MakeStore<RootState> = () => createStore();

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: false });
