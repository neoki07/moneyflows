import Link from "next/link";

type NavItemProps = Readonly<{
  link: string;
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}>;

export function NavItem({ link, icon: Icon, children }: NavItemProps) {
  return (
    <Link
      className="flex min-h-9 items-center rounded-lg px-3 py-1.5 text-slate-700 hover:bg-slate-100"
      href={link}
    >
      {Icon && <span className="mr-1.5">{<Icon className="size-5" />}</span>}
      <span className="text-sm font-semibold">{children}</span>
    </Link>
  );
}
