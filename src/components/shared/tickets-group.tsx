import cn from '@/lib/utils.ts';
import { Ticket } from './ticket.tsx';
import { Button } from '../ui/button.tsx';

interface TicketsGroupProps {
  className?: string;
}

export function TicketsGroup({ className }: TicketsGroupProps) {
  return (
    <>
      <ul className={cn('flex flex-col gap-5 mb-5', className)}>{new Array(5).fill(<Ticket />)}</ul>
      <Button variant="showMore" className="mb-5">
        Показать еще 5 билетов!
      </Button>
    </>
  );
}
