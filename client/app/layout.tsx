import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "artsn.",
  description: "task management platform for artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-background">{children}</body>
    </html>
  );
}
