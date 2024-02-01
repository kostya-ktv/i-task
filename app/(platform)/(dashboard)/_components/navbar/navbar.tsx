import { ClerkLazy, LogoLink } from "@/components/shared";
import styles from "./navbar.module.scss";
import { Skeleton } from "@/components/ui";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { APP_ROUTES } from "@/lib/constants";
import { DashboardNavbar } from "./navbar.service";
import { OrganizationControl } from "./org-control";
import MobileSidebar from "../mobile-sidebar/mobile-sidebar";
import { CreateBoardBtn } from "../create-board-btn";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <OrganizationControl />

      <div className={styles.navbarCreate}>
        <MobileSidebar />
        <LogoLink />
        <CreateBoardBtn className="hidden md:flex" />
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
