import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import githubSearchReducer from './githubSearch';
import youtubeSearchReducer from './youtubeSearch';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist', 'githubSearch', 'youtubeSearch'],
};

const githubPersistConfig = {
  key: 'githubSearch',
  storage,
  whitelist: ['entities', 'totalCountResults'],
  blacklist: ['_persist'],
};

const youtubePersistConfig = {
  key: 'youtubeSearch',
  storage,
  whitelist: ['entities', 'totalCountResults'],
  blacklist: ['_persist'],
};

const rootReducer = combineReducers({
  githubSearch: persistReducer(githubPersistConfig, githubSearchReducer),
  youtubeSearch: persistReducer(youtubePersistConfig, youtubeSearchReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(createStore);

export type RootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;
