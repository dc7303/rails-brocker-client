import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import yorkieSlice from '../features/yorkieSlice';

export const store = configureStore({
  reducer: {
    yorkie: yorkieSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['yorkie.client', 'yorkie.doc'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
