"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/components/ui";
import { Organization } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { DashboardSidebar } from "./sidebar.service";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  isActive?: boolean;
  isExpanded?: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem: React.FC<Props> = (props) => {
  const { onExpand, organization, isActive, isExpanded } = props;
  const router = useRouter();
  const pathname = usePathname();
  const routes = useMemo(
    () => DashboardSidebar.getRoutes(organization.id),
    [organization.id]
  );
  const onNavigate = (route: string) => router.push(route);
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          styles.navItem,
          isActive && !isExpanded && styles.navItemActive
        )}
      >
        <div className={styles.navItemTrigger}>
          <div>
            <Image fill src={organization.imageUrl} alt="org" />
          </div>
          <span>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className={styles.navItemContent}>
        {routes.map((route) => (
          <Button
            key={route.label}
            size="sm"
            variant="ghost"
            onClick={() => onNavigate(route.href)}
            className={cn(
              styles.navItemContentBtn,
              pathname === route.href && styles.navItemContentBtnActive
            )}
          >
            <route.icon className={styles.navItemIcon} />
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
