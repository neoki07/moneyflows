import { Button } from "@/components/ui/button";
import { IconTrashX } from "@tabler/icons-react";
import { EditCategoryButton } from "./edit-category-button";

export function CategoryCard() {
  return (
    <div className="border rounded-lg pl-4 p-2 font-medium flex justify-between items-center">
      給料
      <div>
        <EditCategoryButton />
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-500 hover:bg-red-50"
        >
          <IconTrashX />
        </Button>
      </div>
    </div>
  );
}
