import { baseApi, TicketState } from './ticketsSlice.ts';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getSearchId: create.query<{ searchId: string }, void>({
      query: () => '/search',
    }),
    getTickets: create.query<TicketState, { searchId: string }>({
      query: ({ searchId }) => `/tickets?searchId=${searchId}`,
      merge: (currentCache, newTickets) => {
        currentCache.tickets.push(...newTickets.tickets);
        currentCache.stop = newTickets.stop;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetSearchIdQuery, useGetTicketsQuery } = usersApi;
