import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./_components/sidebar";

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
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-[18rem,1fr]`}
      >
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
