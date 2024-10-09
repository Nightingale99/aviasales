import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { nanoid } from 'nanoid';
import type { Ticket } from './ticket.ts';

export type TicketId = string;

export type TicketState = {
  tickets: Ticket[];
  stop: boolean;
};

const baseUrl = 'https://aviasales-test-api.kata.academy';
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (create) => ({
    getSearchId: create.query<{ searchId: string }, void>({
      query: () => '/search',
    }),
    getTickets: create.query<TicketState, { searchId: string }>({
      query: ({ searchId }) => `/tickets?searchId=${searchId}`,
      merge: (currentCache, newTickets) => {
        currentCache.tickets = [...currentCache.tickets, ...newTickets.tickets];
        currentCache.stop = newTickets.stop;
      },
      transformResponse(baseQueryReturnValue: TicketState) {
        const { tickets } = baseQueryReturnValue;
        const ticketsWithIds = tickets.map((ticket) => ({
          ...ticket,
          id: nanoid(),
        }));
        return {
          tickets: ticketsWithIds,
          stop: baseQueryReturnValue.stop,
        };
      },
    }),
  }),
});

export const { useGetSearchIdQuery, useGetTicketsQuery } = baseApi;
