import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components";

export const metadata: Metadata = {
  title: "MoviesHub",
  description: "Browse and discover movies powered by TMDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
