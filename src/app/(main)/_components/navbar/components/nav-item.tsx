import Link from "next/link";

type NavItemProps = Readonly<{
  link: string;
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}>;

export function NavItem({
  link,
  icon: Icon,
  children,
  rightElement,
}: NavItemProps) {
  return (
    <Link
      className="flex min-h-9 items-center justify-between rounded-lg px-3 py-1.5 text-slate-700 hover:bg-slate-100"
      href={link}
    >
      <div className="flex items-center">
        {Icon && <span className="mr-1.5">{<Icon className="size-5" />}</span>}
        <span className="text-sm font-semibold">{children}</span>
      </div>
      {rightElement}
    </Link>
  );
}
