import Image from "next/image";

export function Sidebar() {
  return (
    <nav className="h-screen bg-slate-50 overflow-y-auto px-3">
      <div className="my-[2.25rem] h-[28px] relative">
        <Image
          src="/logo.png"
          alt="Money Flows"
          fill
          priority
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </div>
      This is Sidebar
    </nav>
  );
}
