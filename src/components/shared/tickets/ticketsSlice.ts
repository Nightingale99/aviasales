import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from './ticket.ts';

export type TicketId = string;

export type TicketState = {
  tickets: Record<TicketId, Ticket | undefined>;
  searchId: string;
  stop: boolean;
  lastIndex: number;
};

const initialState: TicketState = {
  tickets: {},
  searchId: '',
  stop: false,
  lastIndex: 0,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  selectors: {
    selectTickets: (state) => state.tickets,
    selectStop: (state) => state.stop,
    selectSearchId: (state) => state.searchId,
  },
  reducers: {
    // переделал массив в объект с индексами для того чтобы селекторы имели сложность O(1)
    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = {
        ...state.tickets,
        ...action.payload.reduce(
          (acc, ticket, ind) => ({
            ...acc,
            [(ind + state.lastIndex).toString()]: ticket,
          }),
          <Record<TicketId, Ticket | undefined>>{},
        ),
      };
      state.lastIndex += action.payload.length - 1;
    },

    setSearchId: (state, action: PayloadAction<string>) => {
      state.searchId = action.payload;
    },
    setStop: (state, action: PayloadAction<boolean>) => {
      state.stop = action.payload;
    },
  },
});

export const { addTickets, setSearchId, setStop } = ticketsSlice.actions;

export default ticketsSlice.reducer;
