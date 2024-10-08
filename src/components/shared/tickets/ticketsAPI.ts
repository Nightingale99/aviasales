import { nanoid } from 'nanoid';
import { baseApi, TicketState } from './ticketsSlice.ts';

export const usersApi = baseApi.injectEndpoints({
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
  overrideExisting: true,
});

export const { useGetSearchIdQuery, useGetTicketsQuery } = usersApi;
