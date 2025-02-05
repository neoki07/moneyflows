import {
  IconCategory,
  IconExchange,
  IconHome,
  IconTags,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { CreateDashboardButton } from "./components/create-dashboard-button";
import { NavItem } from "./components/nav-item";
import { UserArea } from "./components/user-area";

export function Navbar() {
  return (
    <nav className="flex h-screen flex-col border-r">
      <div className="h-screen overflow-y-auto bg-slate-50 px-3">
        <div className="px-2 py-[2.25rem]">
          <Link href="/">
            <div className="relative h-[28px]">
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
            <div className="grid h-6 grid-cols-[1fr_1rem] px-3 text-xs font-semibold text-slate-500">
              ダッシュボード
              <CreateDashboardButton />
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
      <UserArea />
    </nav>
  );
}
