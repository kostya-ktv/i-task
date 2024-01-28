import { ClerkLazy } from "@/components/shared";
import { APP_ROUTES } from "@/lib/constants";
import { OrganizationList } from "@clerk/nextjs";

const OrganizationPage = () => {
  return (
    <ClerkLazy>
      <OrganizationList
        hidePersonal
        //@ts-ignore
        afterSelectOrganizationUrl={APP_ROUTES.orgId}
        afterCreateOrganizationUrl={APP_ROUTES.orgId}
      />
    </ClerkLazy>
  );
};
export default OrganizationPage;
