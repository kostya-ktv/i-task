import { ClerkLazy, TitlePage } from "@/components/shared";
import { Skeletons } from "@/components/shared/skeletons";
import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <>
      <TitlePage title="Settings" />

      <ClerkLazy loader={<Skeletons.SkeletonPage />}>
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: {
                boxShadow: "none",
                maxWidth: "100%",
              },
              navbar: {
                border: "none",
              },
              card: {
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e2e2e2",
                boxShadow: "none",
                margin: "0",
                width: "100%",
              },
            },
          }}
        />
      </ClerkLazy>
    </>
  );
};
export default SettingsPage;
