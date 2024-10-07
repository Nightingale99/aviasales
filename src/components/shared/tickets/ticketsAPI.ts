import axios from 'axios';
import { TicketState } from './ticketsSlice.ts';

export const getSearchId = async (): Promise<string> => {
  const { data } = await axios.get(
    'https://aviasales-test-api.kata.academy/search',
  );
  return data.searchId;
};

export async function getTickets(searchId: string): Promise<TicketState> {
  try {
    const response = await axios.get(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      searchId,
      tickets: [],
      stop: false,
      status: 'loading',
    };
  }
}
