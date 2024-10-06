import cn from '@/lib/utils.ts';
import { add } from 'date-fns';

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
}

interface TicketProps {
  className?: string;
  ticketData: Ticket;
}

function numberWithSpace(num: number): string {
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

function rightEndingReturner(num: number, str: string): string {
  if (num % 10 === 1 && num % 100 !== 11) {
    return `${str}ок`;
  }
  if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return `${str}ка`;
  }
  return `${str}ки`;
}

export function Ticket({ className, ticketData }: TicketProps) {
  const firstSegmentDate = new Date(ticketData.segments[0].date);

  const secondSegmentDate = new Date(ticketData.segments[1].date);

  const firstSegmentAdded = add(firstSegmentDate, {
    minutes: ticketData.segments[0].duration,
  });

  const secondSegmentAdded = add(secondSegmentDate, {
    minutes: ticketData.segments[0].duration,
  });

  const durationFirst = ticketData.segments[0].duration;
  const durationSecond = ticketData.segments[1].duration;

  return (
    <li
      className={cn(
        'bg-white rounded-sm list-none p-5 max-w-[502px]',
        className,
      )}
    >
      <div className="flex flex-row justify-between mb-5">
        <span className="text-primary font-opensansbold text-2xl">
          {numberWithSpace(ticketData.price)} P
        </span>
        <img
          src={`https://pics.avs.io/99/36/${ticketData.carrier}.png`}
          alt="company-logo"
        />
      </div>
      <div className="text-sm flex flex-row justify-between mb-2.5">
        <div>
          <h6 className="text-muted uppercase text-[12px]">
            {ticketData.segments[0].origin} -{' '}
            {ticketData.segments[0].destination}
          </h6>
          <span>
            {firstSegmentDate.getHours().toString().padStart(2, '0')}:
            {firstSegmentDate.getMinutes().toString().padStart(2, '0')} -{' '}
            {firstSegmentAdded.getHours().toString().padStart(2, '0')}:
            {firstSegmentAdded.getMinutes().toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">В пути</h6>
          <span>
            {Math.floor(durationFirst / 60)
              .toString()
              .padStart(2, '0')}
            ч {(durationFirst % 60).toString().padStart(2, '0')}м
          </span>
        </div>
        <div className="min-w-[102px]">
          <h6 className="text-muted uppercase text-[12px]">
            {ticketData.segments[0].stops.length}{' '}
            {rightEndingReturner(
              ticketData.segments[0].stops.length,
              'пересад',
            )}
          </h6>
          <span>{ticketData.segments[0].stops.join(', ')}</span>
        </div>
      </div>
      <div className="text-sm flex flex-row justify-between">
        <div>
          <h6 className="text-muted uppercase text-[12px]">
            {ticketData.segments[1].origin} -{' '}
            {ticketData.segments[1].destination}
          </h6>
          <span>
            {secondSegmentDate.getHours().toString().padStart(2, '0')}:
            {secondSegmentDate.getMinutes().toString().padStart(2, '0')} -{' '}
            {secondSegmentAdded.getHours().toString().padStart(2, '0')}:
            {secondSegmentAdded.getMinutes().toString().padStart(2, '0')}
          </span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">В пути</h6>
          <span>
            {Math.floor(durationSecond / 60)
              .toString()
              .padStart(2, '0')}
            ч {(durationSecond % 60).toString().padStart(2, '0')}м
          </span>
        </div>
        <div className="min-w-[102px]">
          <h6 className="text-muted uppercase text-[12px]">
            {ticketData.segments[1].stops.length}{' '}
            {ticketData.segments[0].stops.length}{' '}
            {rightEndingReturner(
              ticketData.segments[0].stops.length,
              'пересад',
            )}
          </h6>
          <span>{ticketData.segments[1].stops.join(', ')}</span>
        </div>
      </div>
    </li>
  );
}
