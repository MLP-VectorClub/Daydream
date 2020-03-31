import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer, { ActionsType, RootState } from './rootReducer';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootState>();

const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [epicMiddleware, ...getDefaultMiddleware()],
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

let latestStore: AppStore;

export const initStore = (preloadedState = {}): AppStore => {
  if (!latestStore) {
    latestStore = createStore(preloadedState);
  }

  return latestStore;
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    if (latestStore) {
      latestStore.replaceReducer(newRootReducer);
    }
  });
}
