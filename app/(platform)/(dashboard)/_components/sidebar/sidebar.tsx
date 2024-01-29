"use client";

import { Card } from "@/components/ui";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Accordion } from "@radix-ui/react-accordion";
import { useLocalStorage } from "usehooks-ts";
import { SidebarItem } from "./sidebar-item";
import { Organization } from "@/lib/types";
import { useCallback } from "react";
import { SidebarComponents } from "./sidebar.util";

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
    <SidebarComponents.SideBarSkeleton />
  ) : (
    <Card>
      <SidebarComponents.SelectOrgButton />
      <Accordion type="multiple" defaultValue={defaultAccordion}>
        {userMemberships.data?.map(({ organization }) => {
          const orgID = organization.id;
          const isActive = currentOrganization?.id === orgID;
          const isExpanded = expanded[orgID];
          return (
            <SidebarItem
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
