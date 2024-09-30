import { useRef } from 'react';
import { headerFilters } from '@/lib/info.ts';
import cn from '@/lib/utils.ts';
import { Button } from '../ui/button.tsx';

interface HeaderFiltersProps {
  className?: string;
}

export function HeaderFilters({ className }: HeaderFiltersProps) {
  const headerOptions = useRef(headerFilters);
  return (
    <ul className={cn('flex flex-row flex-wrap', className)}>
      {headerOptions.current.map((option, i, arr) => (
        <li>
          <Button
            variant={i === 0 ? 'headerActive' : 'headerDefault'}
            key={option.value}
            className={cn(
              'uppercase border-[1px] border-border',
              i === 0 && 'rounded-l-md border-r-[1px]',
              i === arr.length - 1 && 'rounded-r-md border-l-[1px]',
            )}
          >
            {option.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
