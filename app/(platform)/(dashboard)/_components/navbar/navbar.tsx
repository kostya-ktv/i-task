import { ClerkLazy, LogoLink } from "@/components/shared";
import styles from "./navbar.module.scss";
import { Button, Skeleton } from "@/components/ui";
import { PlusCircleIcon } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { APP_ROUTES } from "@/lib/constants";
import { DashboardNavbar } from "./navbar.service";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarCreate}>
        <LogoLink showLogoOnMobile />
        <Button size="sm" variant="outline" className={styles.navbarCreateBtn}>
          <PlusCircleIcon className="h-4" />
          <span className="hidden md:block">Create</span>
        </Button>
      </div>
      <div className={styles.navbarOrgBox}>
        <ClerkLazy
          loader={<Skeleton className="w-[210px] h-[32px] rounded-full" />}
        >
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
        </ClerkLazy>
      </div>
    </nav>
  );
};
