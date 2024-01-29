"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrganizationControl = () => {
  const { orgId } = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (setActive && typeof orgId === "string") {
      setActive({
        organization: orgId,
      });
    }
  }, [setActive, orgId]);

  return null;
};
