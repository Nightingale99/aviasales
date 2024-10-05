import { useRef } from 'react';
import cn from '@/lib/utils.ts';
import { TransferCheckboxGroup } from './transfer-checkbox-group.tsx';

interface TransferFiltersProps {
  className?: string;
}

export interface FilterInterface {
  value: string;
  label: string;
}

export function TransferFilters({ className }: TransferFiltersProps) {
  const transferOptions = useRef<FilterInterface[]>([
    { value: 'all', label: 'Все' },
    { value: 'none', label: 'Без пересадок' },
    { value: '1', label: '1 пересадка' },
    { value: '2', label: '2 пересадки' },
    { value: '3', label: '3 пересадки' },
  ]);

  return (
    <aside
      className={cn(
        'flex flex-col bg-white max-w-[232px] rounded-md text-sm py-5 h-fit',
        className,
      )}
    >
      <h3 className="text-opensansbold uppercase text-title mx-5 pb-2.5">
        Количество пересадок
      </h3>
      <TransferCheckboxGroup transferOptions={transferOptions.current} />
    </aside>
  );
}
