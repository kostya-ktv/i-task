"use client";
import { useMounted } from "@/hooks";
import { CardModal } from "..";

export const CardModalProvider = () => {
  const isMounted = useMounted();

  return isMounted ? <CardModal /> : null;
};
