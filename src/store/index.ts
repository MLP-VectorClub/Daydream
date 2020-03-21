import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer, { ActionsType, RootState } from './rootReducer';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootState>();

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
});

epicMiddleware.run(rootEpic);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch

export default store;
