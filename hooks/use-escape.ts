import { useEventListener } from "usehooks-ts";

export const useEscape = (callback: () => void) => {
  useEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      callback();
    }
  });
};
