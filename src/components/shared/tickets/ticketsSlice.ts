import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Ticket } from './ticket.ts';

const baseUrl = 'https://aviasales-test-api.kata.academy';
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});
export type TicketId = string;

export type TicketState = {
  tickets: Ticket[];
  stop: boolean;
};
