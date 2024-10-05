import cn from '@/lib/utils.ts';
import { Button } from '../../ui/button.tsx';

interface TicketsGroupProps {
  className?: string;
}

export function TicketsGroup({ className }: TicketsGroupProps) {
  return (
    <>
      <ul className={cn('flex flex-col gap-5 mb-5', className)}>
        {/* {tickets.length > 0 ? tickets.map((ticket) => (
          <Ticket key={ticket.id} className="flex flex-col" />
        )) : <>Loading...</>} */}
      </ul>
      <Button variant="showMore" className="mb-5">
        Показать еще 5 билетов!
      </Button>
    </>
  );
}
