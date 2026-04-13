import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton rounded-lg', className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border))] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonMetric() {
  return (
    <div className="bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border))] rounded-xl p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-2.5 w-full rounded-full" />
    </div>
  );
}
