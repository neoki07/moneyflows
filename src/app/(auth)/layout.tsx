export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen grid place-items-center bg-slate-50">
      {children}
    </main>
  );
}
