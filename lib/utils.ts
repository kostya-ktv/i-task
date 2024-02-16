import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAbsolutePath = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};
