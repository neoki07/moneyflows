import { Navbar } from "@/app/(main)/_components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-screen grid-cols-[18rem_1fr]">
      <Navbar />
      <main className="overflow-auto">{children}</main>
    </div>
  );
}
