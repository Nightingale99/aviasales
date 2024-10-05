import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterValue = 'all' | 'none' | '1' | '2' | '3';

export type FiltersState = {
  selectedTransferFilters: Record<FilterValue, boolean>;
  selectedHeaderFilter: 'cheapest' | 'fastest' | 'optimal';
};

const initialState: FiltersState = {
  selectedTransferFilters: {
    all: true,
    none: true,
    1: true,
    2: true,
    3: true,
  },
  selectedHeaderFilter: 'cheapest',
};

function isAllOtherFiltersSelected(filters: Record<FilterValue, boolean>) {
  const otherFilters = ['1', '2', '3', 'none'];
  return otherFilters.every((key) => filters[key as FilterValue]);
}

function selectAllOthers(filters: Record<FilterValue, boolean>) {
  const otherFilters = ['1', '2', '3', 'none'];
  otherFilters.forEach((key) => {
    filters[key as FilterValue] = true;
  });
}
function deselectAllOthers(filters: Record<FilterValue, boolean>) {
  const otherFilters = ['1', '2', '3', 'none'];
  otherFilters.forEach((key) => {
    filters[key as FilterValue] = false;
  });
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  selectors: {
    selectTransferFilters: (state) => state.selectedTransferFilters,
    selectHeaderFilter: (state) => state.selectedHeaderFilter,
  },
  reducers: {
    setHeaderFilter: (state, action: PayloadAction<string>) => {
      state.selectedHeaderFilter = action.payload as
        | 'cheapest'
        | 'fastest'
        | 'optimal';
    },
    setTransferFilters: (state, action: PayloadAction<string>) => {
      const value = action.payload as FilterValue;
      if (value !== 'all') {
        state.selectedTransferFilters[value] =
          !state.selectedTransferFilters[value];
      }
      if (value === 'all') {
        if (isAllOtherFiltersSelected(state.selectedTransferFilters)) {
          deselectAllOthers(state.selectedTransferFilters);
        } else {
          selectAllOthers(state.selectedTransferFilters);
        }
        state.selectedTransferFilters.all = !state.selectedTransferFilters.all;
      } else if (state.selectedTransferFilters.all) {
        state.selectedTransferFilters.all = false;
      } else if (
        !state.selectedTransferFilters.all &&
        isAllOtherFiltersSelected({
          ...state.selectedTransferFilters,
          [value]: true,
        })
      ) {
        state.selectedTransferFilters.all = true;
      }
    },
  },
});

export default filtersSlice.reducer;

export const { setTransferFilters, setHeaderFilter } = filtersSlice.actions;

export const { selectTransferFilters, selectHeaderFilter } =
  filtersSlice.selectors;
