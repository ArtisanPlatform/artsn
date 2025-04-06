import type { Metadata } from "next";
import { VerticalSidebar } from "@/components/vertical-sidebar";
import { Header } from "@/components/header";
import AppInitProvider from "@/providers/app-init-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "artsn.",
  description: "task management platform for artisans",
};

export default function ArtsnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-background">
        <AppInitProvider>
          <VerticalSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 overflow-auto p-4">{children}</div>
          </div>
        </AppInitProvider>
      </body>
    </html>
  );
}
