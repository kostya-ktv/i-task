import type { Metadata } from "next";
import "@/styles/globals.css";
import { fontInit } from "@/styles/fonts";
import { SITE_DATA } from "@/config/meta";

export const metadata: Metadata = {
  title: {
    default: SITE_DATA.name,
    template: `%s | ${SITE_DATA.name}`,
  },
  description: SITE_DATA.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontInit}>
      <body className="font-poppins h-screen bg-slate-900">{children}</body>
    </html>
  );
}
