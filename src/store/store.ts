import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '@shared/tickets/ticketsSlice.ts';
import filtersReducer from '@shared/filters/filtersSlice.ts';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer,
  },
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
