export interface filterInterface {
  value: string;
  label: string;
}

export const transferFilters: filterInterface[] = [
  { value: 'all', label: 'Все' },
  { value: 'none', label: 'Без пересадок' },
  { value: '1', label: '1 пересадка' },
  { value: '2', label: '2 пересадки' },
  { value: '3', label: '3 пересадки' },
];

export const headerFilters: filterInterface[] = [
  { value: 'cheapest', label: 'Самый дешевый' },
  { value: 'fastest', label: 'Самый быстрый' },
  { value: 'optimal', label: 'Оптимальный' },
];
