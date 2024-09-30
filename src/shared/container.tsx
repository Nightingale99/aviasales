import cn from '@/lib/utils.ts';

interface ContainerProps {
  className?: string;
}

export default function Container({ className }: ContainerProps) {
  return <div className={cn(className)}>intoroduction</div>;
}
