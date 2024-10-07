import cn from '@/lib/utils.ts';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks.ts';
import { Spinner } from '@/components/ui/spinner.tsx';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert.tsx';
import { Ban } from 'lucide-react';
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
  selectTransferFilters,
} from '../filters/filtersSlice.ts';
import { filterTickets, sortTickets } from './helper-functions.ts';

interface TicketsGroupProps {
  className?: string;
}

export function TicketsGroup({ className }: TicketsGroupProps) {
  const tickets = useSelector(selectTickets);
  const searchId = useSelector(selectSearchId);
  const stop = useSelector(selectStop);
  const status = useSelector(selectStatus);
  const [showCount, setShowCount] = useState<number>(5);
  const dispatch = useAppDispatch();
  const transferFilters = useSelector(selectTransferFilters);
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

  const renderTickets = sortTickets(
    filterTickets(tickets, transferFilters),
    sort,
  );

  return (
    <>
      <ul className={cn('flex flex-col gap-5 mb-5', className)}>
        {renderTickets.length === 0 && tickets.length !== 0 && (
          <Alert variant="destructive" className="bg-popover">
            <Ban className="h-4 w-4" />
            <AlertTitle>Проверьте фильтры</AlertTitle>
            <AlertDescription>
              Рейсов, подходящих под заданные фильтры, не найдено
            </AlertDescription>
          </Alert>
        )}
        {status === 'loading' && (
          <Spinner size="large">Загружено {tickets.length} билетов</Spinner>
        )}
        {renderTickets.slice(0, showCount).map((ticket) => (
          <Ticket
            key={nanoid()}
            className="flex flex-col"
            ticketData={ticket}
          />
        ))}
      </ul>
      {tickets.length > 4 && renderTickets.length > 4 && (
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
