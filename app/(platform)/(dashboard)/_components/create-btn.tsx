import { Button } from "@/components/ui";
import { PlusIcon } from "lucide-react";

export const CreateBtn = () => {
  return (
    <Button size="sm" variant="outline" className="hidden md:flex items-center">
      <PlusIcon className="h-4" />
      <span>Create</span>
    </Button>
  );
};
