import { Navbar } from "@/app/(main)/_components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[18rem,1fr] h-screen">
      <Navbar />
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
