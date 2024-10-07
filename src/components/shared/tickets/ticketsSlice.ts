import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from './ticket.ts';

export type TicketId = string;

export type Status = 'loading' | 'fullfiled';
export type TicketState = {
  tickets: Ticket[];
  searchId: string;
  stop: boolean;
  status: Status;
};

const initialState: TicketState = {
  tickets: [],
  searchId: '',
  stop: false,
  status: 'loading',
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  selectors: {
    selectTickets: (state) => state.tickets,
    selectStop: (state) => state.stop,
    selectSearchId: (state) => state.searchId,
    selectStatus: (state) => state.status,
  },
  reducers: {
    /* TODO: если будут селекторы со сложностью больше O(1), то заменить массив на объект */
    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    setSearchId: (state, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    },
    setStop: (state, action: PayloadAction<boolean>) => {
      state.stop = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { addTickets, setSearchId, setStop, setStatus } =
  ticketsSlice.actions;

export const { selectTickets, selectStop, selectSearchId, selectStatus } =
  ticketsSlice.selectors;

export default ticketsSlice.reducer;
