import cn from '@/lib/utils.ts';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert.tsx';
import { Ban } from 'lucide-react';
import { Button } from '../../ui/button.tsx';
import { Ticket } from './ticket.tsx';
import { useGetTicketsQuery, usersApi } from './ticketsAPI.ts';
import {
  selectHeaderFilter,
  selectTransferFilters,
} from '../filters/filtersSlice.ts';
import { filterTickets, sortTickets } from './helper-functions.ts';

interface TicketsGroupProps {
  className?: string;
}

export function TicketsGroup({ className }: TicketsGroupProps) {
  const { data: searchIdData } = usersApi.useGetSearchIdQuery();

  const searchId = searchIdData?.searchId || '';

  const stopRef = useRef(false);

  const { data: ticketsData } = useGetTicketsQuery(
    { searchId },
    { skip: !searchId || stopRef.current, pollingInterval: 200 },
  );

  const [showCount, setShowCount] = useState<number>(5);

  const transferFilters = useSelector(selectTransferFilters);

  const sort = useSelector(selectHeaderFilter);

  const tickets = useMemo(() => ticketsData?.tickets || [], [ticketsData]);

  const renderTickets = useMemo(
    () => sortTickets(filterTickets(tickets, transferFilters), sort),
    [tickets, sort, transferFilters],
  );

  useEffect(() => {
    if (!stopRef.current) {
      const stop = ticketsData?.stop;
      if (stop) {
        stopRef.current = stop;
        toast('Билеты загружены', {
          description: `Получено ${tickets.length} билетов!`,
          duration: 5000,
        });
      }
    }
  });

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
        {!stopRef.current && (
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
