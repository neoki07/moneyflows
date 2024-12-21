import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr]">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl flex-1">タグ</h1>
        <Button>
          <PlusIcon />
          タグを追加
        </Button>
      </div>
      <div>This is the tags page.</div>
    </div>
  );
}
