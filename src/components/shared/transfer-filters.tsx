import { useRef } from 'react';
import cn from '@/lib/utils.ts';
import { TransferCheckboxGroup } from './transfer-checkbox-group.tsx';
import { transferFilters } from '@/lib/info.ts';

interface TransferFiltersProps {
  className?: string;
}

export function TransferFilters({ className }: TransferFiltersProps) {
  const transferOptions = useRef(transferFilters);
  return (
    <aside
      className={cn(
        'flex flex-col bg-white max-w-[232px] rounded-md text-sm py-5 max-h-fit',
        className,
      )}
    >
      <h3 className="text-opensansbold uppercase text-title mx-5 pb-2.5">Количество пересадок</h3>
      <TransferCheckboxGroup transferOptions={transferOptions.current} />
    </aside>
  );
}
