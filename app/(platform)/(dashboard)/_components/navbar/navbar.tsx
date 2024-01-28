import { LogoLink } from "@/components/shared";
import styles from "./navbar.module.scss";
import { Button } from "@/components/ui";
import { PlusCircleIcon } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarCreate}>
        <LogoLink />
        <Button size="sm" variant="outline" className={styles.navbarCreateBtn}>
          <PlusCircleIcon className="h-4" />
          <span className="hidden md:block">Create</span>
        </Button>
      </div>
      <div className={styles.navbarOrgBox}>
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
              },
            },
          }}
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
        />
      </div>
    </nav>
  );
};
