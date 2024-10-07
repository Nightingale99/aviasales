import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '@shared/tickets/ticketsSlice.ts';
import filtersReducer from '@shared/filters/filtersSlice.ts';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
}>();
