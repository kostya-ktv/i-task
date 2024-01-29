"use client";

import { Button, Card } from "@/components/ui";
import { APP_ROUTES } from "@/lib/constants";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Accordion } from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem } from "./nav-item";
import { Organization } from "@/lib/types";
import { useCallback } from "react";
import styles from "./sidebar.module.scss";
import { SideBarSkeleton } from "./sidebar-skeleton";

interface Props {
  storageKey?: string;
}

const Sidebar: React.FC<Props> = (props) => {
  const { storageKey = "k-sb-state" } = props;
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: currentOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const isLoading =
    !isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading;

  const defaultAccordion = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );
  const onExpand = useCallback(
    (id: string) => {
      setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
    },
    [setExpanded, expanded]
  );

  return isLoading ? (
    <SideBarSkeleton />
  ) : (
    <Card>
      <div className={styles.sidebar}>
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href={APP_ROUTES.selectOrg}>
            <PlusIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={defaultAccordion}>
        {userMemberships.data?.map(({ organization }) => {
          const orgID = organization.id;
          const isActive = currentOrganization?.id === orgID;
          const isExpanded = expanded[orgID];
          return (
            <NavItem
              key={orgID}
              isActive={isActive}
              isExpanded={isExpanded}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          );
        })}
      </Accordion>
    </Card>
  );
};
export default Sidebar;
