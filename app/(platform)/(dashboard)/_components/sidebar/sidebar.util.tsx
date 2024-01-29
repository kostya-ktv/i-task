import { Button, Skeleton } from "@/components/ui";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { APP_ROUTES } from "@/lib/constants";

export namespace SidebarComponents {
  export const SideBarSkeleton = () => (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-x-2">
        <div className="w-10 h-10 relative shrink-0">
          <Skeleton className="h-full w-full absolute" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
  );
  export const SelectOrgButton = () => {
    return (
      <div className={styles.sidebar}>
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href={APP_ROUTES.selectOrg}>
            <PlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  };
}
