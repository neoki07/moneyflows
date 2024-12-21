import { CategoryCard } from "./_components/category-card";
import { AddCategoryButton } from "./_components/add-category-button";

export default function Page() {
  return (
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr]">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl flex-1">カテゴリー</h1>
        <AddCategoryButton />
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="font-bold text-xl">収入</h2>
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-xl">支出</h2>
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
