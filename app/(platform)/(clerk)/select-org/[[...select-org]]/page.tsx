import { ClerkLazy } from "@/components/shared";
import { OrganizationList } from "@clerk/nextjs";

const OrganizationPage = () => {
  return (
    <ClerkLazy>
      <OrganizationList
        hidePersonal
        //@ts-ignore
        afterSelectOrganizationUrl="/organization/:slug"
        afterCreateOrganizationUrl="/organization/:id"
      />
    </ClerkLazy>
  );
};
export default OrganizationPage;
