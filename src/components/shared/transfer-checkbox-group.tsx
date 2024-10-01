import cn from '@/lib/utils.ts';
import { Checkbox } from '../ui/checkbox.tsx';

interface TransferCheckboxGroupProps {
  className?: string;
  transferOptions: { value: string; label: string }[];
}

export function TransferCheckboxGroup({ className, transferOptions }: TransferCheckboxGroupProps) {
  return (
    <ul className={cn('flex flex-col ', className)}>
      {transferOptions.map((option) => (
        <li key={option.value}>
          <label
            className="flex items-center px-5 py-2.5 hover:bg-primary-foreground cursor-pointer transition-all duration-300"
            htmlFor={option.value}
          >
            <Checkbox className="h-5 w-5" id={option.value} />
            <span className="ml-2.5 text-[13px] cursor-pointer select-none">{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
