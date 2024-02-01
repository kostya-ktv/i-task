import { TitlePage } from "@/components/shared";
import { Info } from "./_components/info/info";
import { Separator } from "@/components/ui";
import { BoardList } from "./_components/board-list/board-list";

const OrganizationIDPage = () => {
  return (
    <>
      <TitlePage title="Boards" />
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </>
  );
};
export default OrganizationIDPage;
