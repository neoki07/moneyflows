import Link from "next/link";
import Image from "next/image";
import { NavItem } from "./nav-item";
import {
  IconCategory,
  IconExchange,
  IconHome,
  IconPlus,
  IconTags,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="border-r h-screen flex flex-col">
      <div className="h-screen bg-slate-50 overflow-y-auto px-3">
        <div className="py-[2.25rem] px-2">
          <Link href="/">
            <div className="h-[28px] relative">
              <Image
                src="/logo.png"
                alt="Money Flows"
                fill
                sizes="247px"
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <ul>
            <li>
              <NavItem link="/" icon={IconHome} active>
                ホーム
              </NavItem>
            </li>
            <li>
              <NavItem link="/transactions" icon={IconExchange}>
                収支
              </NavItem>
            </li>
            <li>
              <NavItem link="/categories" icon={IconCategory}>
                カテゴリー
              </NavItem>
            </li>
            <li>
              <NavItem link="/tags" icon={IconTags}>
                タグ
              </NavItem>
            </li>
          </ul>
          <ul>
            <div className="text-slate-500 text-xs font-semibold px-3 h-6 grid grid-cols-[1fr_1rem]">
              ダッシュボード
              <IconPlus size={16} />
            </div>
            <li>
              <NavItem link="/dashboards/dashboard1">収入全般</NavItem>
            </li>
            <li>
              <NavItem link="/dashboards/dashboard2">支出全般</NavItem>
            </li>
            <li>
              <NavItem link="/dashboards/dashboard3">カテゴリー別</NavItem>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4">
        <UserButton />
      </div>
    </nav>
  );
}
