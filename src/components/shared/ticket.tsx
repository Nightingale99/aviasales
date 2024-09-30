import cn from '@/lib/utils.ts';
import s7logo from '../../assets/S7Logo.svg';

interface TicketProps {
  className?: string;
}

export function Ticket({ className }: TicketProps) {
  return (
    <li className={cn('bg-white rounded-sm list-none p-5', className)}>
      <div className="flex flex-row justify-between mb-5">
        <span className="text-primary font-opensansbold text-2xl">13 400 P</span>
        <img src={s7logo} alt="company-logo" />
      </div>
      <div className="text-sm flex flex-row justify-between mb-2.5">
        <div>
          <h6 className="text-muted uppercase text-[12px]">MOW - HKT</h6>
          <span>10:45 - 08:00</span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">В пути</h6>
          <span>21ч 15м</span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">2 пересадки</h6>
          <span>HKG, JNB</span>
        </div>
      </div>
      <div className="text-sm flex flex-row justify-between">
        <div>
          <h6 className="text-muted uppercase text-[12px]">MOW - HKT</h6>
          <span>10:45 - 08:00</span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">В пути</h6>
          <span>21ч 15м</span>
        </div>
        <div>
          <h6 className="text-muted uppercase text-[12px]">2 пересадки</h6>
          <span>HKG, JNB</span>
        </div>
      </div>
    </li>
  );
}
