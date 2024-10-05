import cn from '@/lib/utils.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '../../ui/checkbox.tsx';
import {
  FilterValue,
  selectTransferFilters,
  setTransferFilters,
} from './filtersSlice.ts';

interface TransferCheckboxGroupProps {
  className?: string;
  transferOptions: { value: string; label: string }[];
}

export function TransferCheckboxGroup({
  className,
  transferOptions,
}: TransferCheckboxGroupProps) {
  const dispatch = useDispatch();

  const transferFilters = useSelector(selectTransferFilters);
  return (
    <ul className={cn('flex flex-col ', className)}>
      {transferOptions.map((option) => (
        <li key={option.value}>
          <label
            className="flex items-center px-5 py-2.5 hover:bg-primary-foreground cursor-pointer transition-all duration-300"
            htmlFor={option.value}
          >
            <Checkbox
              className="h-5 w-5"
              id={option.value}
              onCheckedChange={() => dispatch(setTransferFilters(option.value))}
              checked={transferFilters[option.value as FilterValue]}
            />
            <span className="ml-2.5 text-[13px] cursor-pointer select-none">
              {option.label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
