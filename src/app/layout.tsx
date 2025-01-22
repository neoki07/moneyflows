import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Money Flows",
  description:
    "あなたの経済活動をそっとサポート。直感的なダッシュボードでお金の流れを把握し、安心できる暮らしを作りましょう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-[18rem,1fr] h-screen`}
        >
          <Navbar />
          <main className="overflow-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
