import cn from '@/lib/utils.ts';
import { add } from 'date-fns';
import type { Segment } from './ticket.tsx';
import { rightEndingReturner } from './helper-functions.ts';

interface SegmentProps {
  className?: string;
  segment: Segment;
}

export function Segment({
  className,
  segment: { origin, destination, date, duration, stops },
}: SegmentProps) {
  const segmentDate = new Date(date);

  const segmentAdded = add(segmentDate, {
    minutes: duration,
  });

  return (
    <div className={cn('text-sm flex flex-row justify-between', className)}>
      <div>
        <h6 className="text-muted uppercase text-[12px]">
          {origin} - {destination}
        </h6>
        <span>
          {segmentDate.getHours().toString().padStart(2, '0')}:
          {segmentDate.getMinutes().toString().padStart(2, '0')} -{' '}
          {segmentAdded.getHours().toString().padStart(2, '0')}:
          {segmentAdded.getMinutes().toString().padStart(2, '0')}
        </span>
      </div>
      <div>
        <h6 className="text-muted uppercase text-[12px]">В пути</h6>
        <span>
          {Math.floor(duration / 60)
            .toString()
            .padStart(2, '0')}
          ч {(duration % 60).toString().padStart(2, '0')}м
        </span>
      </div>
      <div className="min-w-[102px]">
        <h6 className="text-muted uppercase text-[12px]">
          {stops.length} {rightEndingReturner(stops.length, 'пересад')}
        </h6>
        <span>{stops.join(', ')}</span>
      </div>
    </div>
  );
}
