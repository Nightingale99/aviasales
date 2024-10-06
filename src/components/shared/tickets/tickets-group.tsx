import cn from '@/lib/utils.ts';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import { Spinner } from '@/components/ui/spinner.tsx';
import { toast } from 'sonner';
import { Button } from '../../ui/button.tsx';
import {
  addTickets,
  selectSearchId,
  selectStatus,
  selectStop,
  selectTickets,
  setSearchId,
  setStatus,
  setStop,
} from './ticketsSlice.ts';
import { Ticket } from './ticket.tsx';
import { getSearchId, getTickets } from './ticketsAPI.ts';
import {
  selectHeaderFilter,
  // selectTransferFilters,
} from '../filters/filtersSlice.ts';

interface TicketsGroupProps {
  className?: string;
}

function sortTickets(tickets: Ticket[], sort: string) {
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

export function TicketsGroup({ className }: TicketsGroupProps) {
  const tickets = useSelector(selectTickets);
  const searchId = useSelector(selectSearchId);
  const stop = useSelector(selectStop);
  const status = useSelector(selectStatus);
  const [showCount, setShowCount] = useState<number>(5);
  const dispatch = useAppDispatch();
  // const transferFilters = useSelector(selectTransferFilters);
  const sort = useSelector(selectHeaderFilter);

  useEffect(() => {
    if (!searchId) {
      getSearchId().then((data) => {
        dispatch(setSearchId(data));
      });
    }
  });

  useEffect(() => {
    if (stop) {
      dispatch(setStatus('fullfiled'));
      toast('Билеты загружены', {
        description: `Получено ${tickets.length} билетов!`,
      });
    }
    if (searchId && !stop) {
      (async () => {
        const dataTickets = await getTickets(searchId);
        dispatch(addTickets(dataTickets.tickets));
        if (dataTickets.stop) {
          dispatch(setStop(dataTickets.stop));
        }
      })();
    }
  }, [dispatch, searchId, tickets, stop]);
  return (
    <>
      <ul className={cn('flex flex-col gap-5 mb-5', className)}>
        {status === 'loading' && (
          <Spinner size="large">Загружено {tickets.length} билетов</Spinner>
        )}
        {tickets.length > 0 &&
          sortTickets(tickets, sort)
            .slice(0, showCount)
            .map((ticket) => (
              <Ticket
                key={tickets.indexOf(ticket)}
                className="flex flex-col"
                ticketData={ticket}
              />
            ))}
      </ul>
      {tickets.length > 4 && (
        <Button
          variant="showMore"
          className="mb-5"
          onClick={() => {
            setShowCount((prev) => prev + 5);
          }}
        >
          Показать еще 5 билетов!
        </Button>
      )}
    </>
  );
}
