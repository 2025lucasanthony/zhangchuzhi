"use client";

import Link from "next/link";
import { BlogPost } from "@/types"; // 导入 BlogPost 类型
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface BlogSectionProps {
  latestPosts: BlogPost[]; // 接收 latestPosts 作为 props
}

export function BlogSection({ latestPosts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            最新博客
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>
                    {format(new Date(post.date), "yyyy年MM月dd日", {
                      locale: zhCN,
                    })}
                  </span>
                  <span>{post.readTime} 分钟阅读</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

