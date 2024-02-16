"use client";

import { stripeRedirect } from "@/actions/stripe";
import { LogoImg } from "@/components/shared";
import { Button, Dialog, DialogContent } from "@/components/ui";
import { useProModal } from "@/hooks";
import Image from "next/image";
import { useBoolean } from "usehooks-ts";

export const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const isLoading = useBoolean();
  const upgradeClick = async () => {
    isLoading.setTrue();
    await stripeRedirect()
      .then((url) => (window.location.href = url))
      .finally(() => isLoading.setFalse());
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
      max-w-md p-0 overflow-hidden"
      >
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            alt="hero"
            className="object-cover"
            fill
            src="/assets/hero.jpg"
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl flex">
            Upgrade to <LogoImg />
            iTask PRO Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the of iTask
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>and more...</li>
            </ul>
          </div>
          <Button onClick={upgradeClick} className="w-full" variant="green">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
