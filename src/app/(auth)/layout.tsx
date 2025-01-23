import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-slate-50">
      {children}
    </main>
  );
}
