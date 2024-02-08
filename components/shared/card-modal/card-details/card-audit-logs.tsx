"use client";

import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { ACTION, AuditLog, Card } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ActivityIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export const CardAuditLogs: React.FC<{ cardId: Card["id"] }> = ({ cardId }) => {
  const { data: logs, isLoading } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}/logs`),
  });
  console.log(logs);
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2 items-center mb-2">
        <ActivityIcon className="h-4 w-4" />
        <span className="text-sm font-semibold">Activity</span>
      </div>

      {logs?.map((log, logIndex) => (
        <div key={log.id} className="grid grid-cols-[30px_1fr] items-center">
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
