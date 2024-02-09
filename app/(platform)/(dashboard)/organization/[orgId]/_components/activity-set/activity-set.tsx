import { AuditItem } from "@/components/shared/card-modal/card-details/card-audit-logs/card-audit-item";
import { APP_ROUTES } from "@/lib/constants";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ActivitySet = async () => {
  const { orgId } = auth();
  if (!orgId) redirect(APP_ROUTES.selectOrg);
  const logs = await db.auditLog.findMany({ where: { orgId } });

  return (
    <div className="flex flex-col gap-y-2 mt-4">
      {!logs.length && <span>No activity yet</span>}
      {logs.map((log) => (
        <AuditItem log={log} key={log.id} />
      ))}
    </div>
  );
};
export default ActivitySet;
