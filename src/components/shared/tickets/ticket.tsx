import cn from '@/lib/utils.ts';
import { Segment } from './segment.tsx';
import { numberWithSpace } from './helper-functions.ts';

export interface Segment {
  origin: string;
  destination: string;
  date: Date;
  duration: number;
  stops: string[];
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: Segment[];
  id: string;
}

interface TicketProps {
  className?: string;
  ticketData: Ticket;
}

export function Ticket({
  className,
  ticketData: { segments, price, carrier },
}: TicketProps) {
  return (
    <li
      className={cn(
        'bg-white rounded-sm list-none p-5 max-w-[502px]',
        className,
      )}
    >
      <div className="flex flex-row justify-between mb-5">
        <span className="text-primary font-opensansbold text-2xl">
          {numberWithSpace(price)} P
        </span>
        <img
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="company-logo"
        />
      </div>
      <Segment className="mb-2.5" segment={segments[0]} />
      <Segment segment={segments[1]} />
    </li>
  );
}
