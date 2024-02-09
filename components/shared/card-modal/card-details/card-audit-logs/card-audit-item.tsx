import { ACTION, AuditLog } from "@prisma/client";
import styles from "./card-audit-logs.module.scss";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui";

export const AuditItemSkeleton = () => (
  <div className={styles.cardAuditLogContainer}>
    <Skeleton className="w-5 h-5 rounded-full" />
    <Skeleton className="w-[170px] h-10 " />
  </div>
);

export const AuditItem: React.FC<{ log: AuditLog }> = ({ log }) => {
  return (
    <div className={styles.cardAuditLogContainer}>
      <Image
        width={20}
        height={20}
        src={log.userImage}
        alt="avatar"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-x-2 items-center">
          <span className="text-xs font-semibold">{log.userName}</span>
          <span className="flex gap-x-2">
            <div
              className={cn(
                " text-[11px] flex items-center justify-center px-2 rounded-lg text-neutral-200",
                log.action === ACTION.CREATE && "bg-green-500",
                log.action === ACTION.UPDATE && "bg-orange-500",
                log.action === ACTION.DELETE && "bg-red-500"
              )}
            >
              {log.action}
            </div>
            <div className="text-[11px] flex items-center justify-center px-2 rounded-lg bg-sky-800 text-neutral-200">
              {log.entityType}
            </div>
            <div className="text-[11px] flex items-center justify-center px-2 rounded-lg bg-neutral-800 text-neutral-200">
              {log.entityTitle}
            </div>
          </span>
        </div>
        <span className="text-[10px] text-neutral-500">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </span>
      </div>
    </div>
  );
};
