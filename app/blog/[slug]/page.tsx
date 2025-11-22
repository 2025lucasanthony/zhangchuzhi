import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { BlogPostContent } from "@/components/blog-post-content";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs(); // 使用 await
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug); // 使用 await
  if (!post) {
    return {
      title: "文章未找到",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug); // 使用 await

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回博客列表</span>
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), "yyyy年MM月dd日", {
                    locale: zhCN,
                  })}
                </time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} 分钟阅读</span>
              </div>
              {post.views !== undefined && (
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{post.views} 次浏览</span>
                </div>
              )}
            </div>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <BlogPostContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
}

