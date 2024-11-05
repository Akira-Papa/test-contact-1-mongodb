"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください。",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  message: z.string().min(10, {
    message: "お問い合わせ内容は10文字以上で入力してください。",
  }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🟡 フォーム送信開始:", values);
    try {
      setIsSubmitting(true);
      console.log("🟡 APIリクエスト送信中...");
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("📝 APIレスポンス:", data);

      if (!response.ok) {
        console.error("❌ APIエラー:", data);
        throw new Error(data.error || "送信に失敗しました");
      }

      console.log("✅ 送信成功");
      toast({
        title: "送信完了",
        description: "お問い合わせありがとうございます。",
      });

      form.reset();
    } catch (error: any) {
      console.error("❌ 送信エラー:", error);
      toast({
        variant: "destructive",
        title: "エラー",
        description: error.message || "送信に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">お問い合わせ</h1>
          <p className="mt-2 text-muted-foreground">
            ご質問・ご要望などございましたら、下記フォームよりお気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お名前</FormLabel>
                    <FormControl>
                      <Input placeholder="山田 太郎" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お問い合わせ内容</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="お問い合わせ内容を入力してください"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  "送信する"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}