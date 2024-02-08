import { Separator, Skeleton } from "@/components/ui";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { CardDetailsForm } from "./card-details-form";
import styles from "./card.module.scss";
import { CardAuditLogs } from "./card-audit-logs";

const CardSkeleton = () => (
  <div className="flex flex-col relative w-full">
    <div className="flex gap-x-2">
      <Skeleton className="w-[20px] h-5" />
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-[100px] h-5" />
        <Skeleton className="w-[100px] h-3" />
      </div>
    </div>
    <div className="flex gap-x-2 mt-5 relative">
      <Skeleton className="w-[20px] h-5" />
      <div className="flex flex-col gap-y-2 w-full">
        <Skeleton className="w-[100px] h-5" />
        <Skeleton className="w-full h-14" />
      </div>
    </div>
    <div className="flex gap-y-2 mt-5 flex-col relative">
      <Skeleton className="w-[100px] h-3" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
    </div>
  </div>
);

export const CardDetails: React.FC<{ cardId: string }> = ({ cardId }) => {
  const { data: card, isLoading } = useQuery<CardWithList>({
    queryKey: ["card", cardId],
    queryFn: () => fetcher(`/api/cards/${cardId}`),
  });
  if (isLoading) return <CardSkeleton />;
  return (
    <div className={styles.cardContainer}>
      {card ? (
        <>
          <CardDetailsForm card={card} />
          <Separator className="my-3" />
          <CardAuditLogs cardId={card.id} />
        </>
      ) : (
        <p>Card not found</p>
      )}
    </div>
  );
};
