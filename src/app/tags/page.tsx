import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TagCard } from "./_components/tag-card";

export default function Page() {
  return (
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr]">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl flex-1">タグ</h1>
        <Button>
          <PlusIcon className="-ml-1.5" />
          タグを追加
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
      </div>
    </div>
  );
}
