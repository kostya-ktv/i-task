import { LogoImg, LogoLink } from "@/components/shared";
import { Button } from "@/components/ui";
import { KeySquareIcon } from "lucide-react";
import Link from "next/link";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <LogoLink />
      <div className={styles.navbarButtons}>
        <Button size="sm" variant="green" asChild>
          <Link href="/sign-in">
            <KeySquareIcon className="h-4" />
            Login
          </Link>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <Link href="/sign-up">
            <LogoImg className="md:hidden" />
            Get iTask
          </Link>
        </Button>
      </div>
    </div>
  );
};
