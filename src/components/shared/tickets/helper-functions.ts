import { FilterValue } from '../filters/filtersSlice.ts';
import { Ticket } from './ticket.tsx';

export function numberWithSpace(num: number): string {
  return num
    .toString()
    .split('')
    .reverse()
    .map((el, ind) => {
      if ((ind + 1) % 3 === 0) {
        return ` ${el}`;
      }
      return el;
    })
    .reverse()
    .join('');
}

export function filterTickets(
  tickets: Ticket[],
  transferFilters: Record<FilterValue, boolean>,
) {
  const newTickets: Ticket[] = []; /* not mutating */
  if (transferFilters.none) {
    tickets.forEach((ticket) => {
      if (
        ticket.segments[0].stops.length === 0 &&
        ticket.segments[1].stops.length === 0
      ) {
        newTickets.push(ticket);
      }
    });
  }

  if (transferFilters['1'] || transferFilters['2'] || transferFilters['3']) {
    tickets.forEach((ticket) => {
      if (transferFilters['1'] && ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1) {
        newTickets.push(ticket);
      }
      if (transferFilters['2'] && ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2) {
        newTickets.push(ticket);
      }
      if (transferFilters['3'] && ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3) {
        newTickets.push(ticket);
      }
    });
  }
  return newTickets;
}

export function sortTickets(tickets: Ticket[], sort: string) {
  const newTickets: Ticket[] = [...tickets]; /* not mutating */
  if (sort === 'cheapest') {
    newTickets.sort((fTicket, sTicket) => fTicket.price - sTicket.price);
  } else if (sort === 'fastest') {
    newTickets.sort(
      (fTicket, sTicket) =>
        fTicket.segments[0].duration +
        fTicket.segments[1].duration -
        (sTicket.segments[0].duration + sTicket.segments[1].duration),
    );
  } else if (sort === 'optimal') {
    newTickets.sort(
      (fTicket, sTicket) =>
        fTicket.segments[0].stops.length - sTicket.segments[0].stops.length,
    );
  }
  return newTickets;
}

export function rightEndingReturner(num: number, str: string): string {
  if (num % 10 === 1 && num % 100 !== 11) {
    return `${str}ка`;
  }
  if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return `${str}ки`;
  }
  return `${str}ок`;
}
