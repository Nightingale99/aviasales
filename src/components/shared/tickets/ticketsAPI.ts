import axios from 'axios';

export const getSearchId = async () => {
  const { data } = await axios.get('https://aviasales-test-api.kata.academy/search');
  return data.searchId;
};

export async function getTickets(searchId: string) {
  const response = await axios.get(
    `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
  );
  return response.data;
}
