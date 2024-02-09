"use client";

import styles from "./card-audit-logs.module.scss";
import { fetcher } from "@/lib/fetcher";
import { AuditLog, Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ActivityIcon } from "lucide-react";
import { AuditItem, AuditItemSkeleton } from "./card-audit-item";

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

      {isLoading && <AuditItemSkeleton />}

      {!logs?.length && <p className="text-sm">No activity yet</p>}

      {logs?.map((log) => (
        <AuditItem log={log} key={log.id} />
      ))}
    </div>
  );
};
