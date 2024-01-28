import { Button } from "@/components/ui";
import { SparkleIcon } from "lucide-react";
import Link from "next/link";
import styles from "./marketing.module.scss";
import { LogoImg } from "@/components/shared";

const MarketingPage = () => {
  return (
    <div className={styles.marketingPage}>
      <div className={styles.topBox}>
        <div className={styles.topBadge}>
          <SparkleIcon className={styles.topBadgeIcon} />
          top task management solution
        </div>
        <h1 className={styles.titleBox}>
          <span className={styles.titleBoxName}>iTask</span> helps team move
        </h1>
        <div className={styles.mainBadge}>work forward.</div>
      </div>
      <div className={styles.descriptionBox}>
        {`Collaborate seamlessly, oversee projects efficiently, and elevate
        productivity. It all with `}
        <strong className="text-white">iTask</strong>
      </div>
      <Button asChild size="lg" variant="secondary">
        <Link href="/sign-up">
          Join to <LogoImg />
          iTask
        </Link>
      </Button>
    </div>
  );
};
export default MarketingPage;
