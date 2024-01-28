import { Spinner } from "@/components/shared";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
