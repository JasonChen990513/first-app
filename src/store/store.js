import{ configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { rootReducer } from './combineReducer';
import { persistStore } from 'redux-persist';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            ignoredActionPaths: ['payload'],
          },
        }),
});


export const perstore = persistStore(store);