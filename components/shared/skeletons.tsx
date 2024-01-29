import { Skeleton } from "../ui";

export namespace Skeletons {
  export const SkeletonPage = () => {
    return (
      <div className="flex flex-col w-full gap-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-12 w-[30%]" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-12 w-[30%]" />
          <Skeleton className="h-12 w-[30%]" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  };
}
