import cn from '@/lib/utils.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../ui/button.tsx';
import { selectHeaderFilter, setHeaderFilter } from './filtersSlice.ts';

interface HeaderFiltersProps {
  className?: string;
}

export function HeaderFilters({ className }: HeaderFiltersProps) {
  const activeFilter = useSelector(selectHeaderFilter);
  const dispatch = useDispatch();

  return (
    <ul className={cn('flex flex-row flex-wrap', className)}>
      <li>
        <Button
          variant={
            activeFilter === 'cheapest' ? 'headerActive' : 'headerDefault'
          }
          onClick={() => dispatch(setHeaderFilter('cheapest'))}
          className="rounded-l-md"
        >
          Самые дешевые
        </Button>
      </li>
      <li>
        <Button
          variant={
            activeFilter === 'fastest' ? 'headerActive' : 'headerDefault'
          }
          onClick={() => dispatch(setHeaderFilter('fastest'))}
        >
          Самые дешевые
        </Button>
      </li>
      <li>
        <Button
          variant={
            activeFilter === 'optimal' ? 'headerActive' : 'headerDefault'
          }
          onClick={() => dispatch(setHeaderFilter('optimal'))}
          className="rounded-r-md"
        >
          Оптимальные
        </Button>
      </li>
    </ul>
  );
}
