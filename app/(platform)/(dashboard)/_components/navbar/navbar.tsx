import { ClerkLazy, LogoLink } from "@/components/shared";
import styles from "./navbar.module.scss";
import { Button, Skeleton } from "@/components/ui";
import { FilePlusIcon } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { APP_ROUTES } from "@/lib/constants";
import { DashboardNavbar } from "./navbar.service";
import { OrganizationControl } from "./org-control";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <OrganizationControl />
      <div className={styles.navbarCreate}>
        <LogoLink showLogoOnMobile />
        <Button size="sm" variant="outline">
          <FilePlusIcon className="h-4" />
          <span className="hidden md:block">Create</span>
        </Button>
      </div>

      <ClerkLazy loader={<Skeleton className={styles.skeleton} />}>
        <div className={styles.navbarOrgBox}>
          <OrganizationSwitcher
            appearance={DashboardNavbar.orgSwitcherTheme}
            hidePersonal
            afterCreateOrganizationUrl={APP_ROUTES.orgId}
            afterLeaveOrganizationUrl={APP_ROUTES.selectOrg}
            afterSelectOrganizationUrl={APP_ROUTES.orgId}
          />
          <UserButton
            afterSignOutUrl={APP_ROUTES.home}
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </ClerkLazy>
    </nav>
  );
};
