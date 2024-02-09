"use client";

import styles from "./card-audit-logs.module.scss";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { ACTION, AuditLog, Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ActivityIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui";

const CardAuditLogSkeleton = () => (
  <div className={styles.cardAuditLogContainer}>
    <Skeleton className="w-5 h-5 rounded-full" />
    <Skeleton className="w-[170px] h-10 " />
  </div>
);

export const CardAuditLogs: React.FC<{ cardId: Card["id"] }> = ({ cardId }) => {
  const { data: logs, isLoading } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}/logs`),
  });

  return (
    <div className={styles.cardAuditLogs}>
      <div className={styles.cardAuditLogsTitleBox}>
        <ActivityIcon className={styles.cardAuditLogsTitleIcon} />
        <span className={styles.cardAuditLogsTitle}>Activity</span>
      </div>

      {isLoading && <CardAuditLogSkeleton />}
      {logs?.map((log) => (
        <div key={log.id} className={styles.cardAuditLogContainer}>
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
      ))}
    </div>
  );
};
