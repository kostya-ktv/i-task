import { TitlePage } from "@/components/shared";
import { Info } from "../_components/info/info";
import dynamic from "next/dynamic";
import { AuditItemSkeleton } from "@/components/shared/card-modal/card-details/card-audit-logs/card-audit-item";

const ActivityLogs = dynamic(
  () => import("../_components/activity-set/activity-set"),
  {
    loading: () => (
      <div className="flex flex-col gap-y-2 mt-4">
        {Array(10)
          .fill(1)
          .map((el, i) => (
            <AuditItemSkeleton key={i} />
          ))}
      </div>
    ),
  }
);
const ActivityPage = () => {
  return (
    <>
      <TitlePage title="Activity" />
      <Info />

      <ActivityLogs />
    </>
  );
};
export default ActivityPage;
