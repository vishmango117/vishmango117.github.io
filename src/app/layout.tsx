import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio and blog",
};

import { buttonVariants } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="border-b border-border/60">
          <nav className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold tracking-tight">Data Portfolio</Link>
            <div className="flex items-center gap-2">
              <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>Home</Link>
              <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>Projects</Link>
              <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "sm" })}>Blog</Link>
              <Link href="/about" className={buttonVariants({ variant: "outline", size: "sm" })}>About</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-border/60 mt-12">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Data Portfolio
          </div>
        </footer>
      </body>
    </html>
  );
}
