"use client";

import { useMounted } from "@/hooks";
import { useMobileSidebar } from "../hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button, Sheet, SheetContent } from "@/components/ui";
import Sidebar from "../sidebar/sidebar";
import { LogoImg } from "@/components/shared";
import { CreateBoardBtnPopoverSidebar } from "../board-new-btn.popover";

export const MobileSidebar = () => {
  const { onClose, onOpen, isOpen } = useMobileSidebar();
  const isMounted = useMounted();
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return isMounted ? (
    <>
      <Button
        variant="outline"
        className="md:hidden hover:bg-current"
        onClick={onOpen}
        size="sm"
      >
        <LogoImg />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-2 pt-10 w-full flex flex-col gap-y-3">
          <h2 className="flex gap-x-2 items-center  justify-center">
            <LogoImg />
            iTask
          </h2>
          <CreateBoardBtnPopoverSidebar />
          <Sidebar storageKey="k-sb-mb-state" />
        </SheetContent>
      </Sheet>
    </>
  ) : null;
};
export default MobileSidebar;
