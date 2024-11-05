import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          お問い合わせシステム
        </h1>
        <p className="text-xl text-muted-foreground">
          ご質問・ご要望などございましたら、お気軽にお問い合わせください。
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              <Mail className="h-5 w-5" />
              お問い合わせはこちら
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}