import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import yorkieSlice from '../features/yorkieSlice';

export const store = configureStore({
  reducer: {
    yorkie: yorkieSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['doc/attach/fulfilled', 'doc/activate/fulfilled'],
      ignoredPaths: ['yorkie.client', 'yorkie.doc'],
    },
    immutableCheck: {
      ignoredPaths: ['yorkie.client', 'yorkie.doc'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
