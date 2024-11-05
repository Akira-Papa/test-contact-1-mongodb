"use client";

import { Button } from "@/components/ui/button";
import { Mail, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">お問い合わせシステム</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Button
            asChild
            variant={pathname === "/" ? "secondary" : "ghost"}
            size="sm"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>トップ</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/contact" ? "secondary" : "ghost"}
            size="sm"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>お問い合わせ</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}