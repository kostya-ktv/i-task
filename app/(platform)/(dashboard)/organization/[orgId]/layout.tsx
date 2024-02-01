import { auth } from "@clerk/nextjs";
import { upperCase } from "lodash";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { orgSlug } = auth();
  return {
    title: upperCase(orgSlug || "organization"),
  };
}
const OrganizationIdLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default OrganizationIdLayout;
