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
      className="hover:bg-slate-100 min-h-9 flex items-center px-3 py-1.5 rounded-lg text-slate-700"
      href={link}
    >
      {Icon && <span className="mr-1.5">{<Icon className="size-5" />}</span>}
      <span className="text-sm font-semibold">{children}</span>
    </Link>
  );
}
