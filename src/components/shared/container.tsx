import cn from '@/lib/utils.ts';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return <div className={cn('max-w-fit mx-auto', className)}>{children}</div>;
}
