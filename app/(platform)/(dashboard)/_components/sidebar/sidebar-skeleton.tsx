import { Skeleton } from "@/components/ui";

export const SideBarSkeleton = () => (
  <div className="flex items-center gap-x-2">
    <div className="w-10 h-10 relative shrink-0">
      <Skeleton className="h-full w-full absolute" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
);
