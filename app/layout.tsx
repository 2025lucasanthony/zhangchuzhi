import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "个人作品展示网站",
    template: "%s | 个人作品展示网站",
  },
  description: "一个使用 Next.js 14 构建的完整个人作品展示网站",
  keywords: ["Next.js", "React", "TypeScript", "作品展示", "博客"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.com",
    title: "个人作品展示网站",
    description: "一个使用 Next.js 14 构建的完整个人作品展示网站",
    siteName: "个人作品展示网站",
  },
  twitter: {
    card: "summary_large_image",
    title: "个人作品展示网站",
    description: "一个使用 Next.js 14 构建的完整个人作品展示网站",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

