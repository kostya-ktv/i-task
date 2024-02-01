"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";
import styles from "./info.module.scss";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

const SkeletonInfo = () => (
  <div className={cn(styles.info, "mb-1")}>
    <div className={styles.infoImgBox}>
      <Skeleton className="w-full h-full" />
    </div>
    <div>
      <Skeleton className="h-10 w-[200px]" />
      <div className={cn(styles.infoCredit, "mt-1")}>
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  </div>
);
export const Info = () => {
  const { isLoaded, organization } = useOrganization();
  return !isLoaded ? (
    <SkeletonInfo />
  ) : (
    <div className={styles.info}>
      <div className={styles.infoImgBox}>
        <Image fill src={organization?.imageUrl!} alt="org-img" />
      </div>
      <div>
        <p className={styles.infoCreditTitle}>{organization?.name}</p>
        <div className={styles.infoCredit}>
          <CreditCardIcon className={styles.infoCreditIcon} />
          Free
        </div>
      </div>
    </div>
  );
};
