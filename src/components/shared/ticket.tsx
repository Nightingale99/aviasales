import cn from '@/lib/utils.ts';

interface ticketProps {
  className?: string;
}

export function ticket({ className }: ticketProps) {
  return (
    <li className={cn(className)}>
      <div className="flex flex-row justify-between p-5">
        <span>13 400 P</span>
        <img src="" alt="" />
      </div>
    </li>
  );
}
