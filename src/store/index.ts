import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { TFunction } from 'next-i18next';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import rootReducer, { ActionsType, RootState } from './rootReducer';
import { rootEpic } from './rootEpic';

const createStore = () => {
  const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootState>();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware, ...getDefaultMiddleware()],
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppPageContext = { req?: { t: TFunction } };
export type WithNamespacesRequired = { namespacesRequired: string[] };

// create a makeStore function
const makeStore: MakeStore<RootState> = () => createStore();

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore);
