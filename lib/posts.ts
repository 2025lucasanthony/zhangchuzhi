// lib/posts.ts  —— 完全兼容 Next.js 14 App Router 的版本
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types";

// posts 目录（相对项目根目录）
const postsDirectory = path.join(process.cwd(), "posts");

// 仅在构建时或服务器端运行，客户端完全不引用 fs
async function getPostSlugsServer() {
  if (typeof window !== "undefined") return []; // 客户端直接返回空
  const fs = await import("fs");
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = await getPostSlugsServer();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      if (typeof window !== "undefined") return null;
      const fs = await import("fs");
      if (!fs.existsSync(fullPath)) return null;

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const wordCount = content.trim().split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        slug,
        title: (data.title as string) || "无标题",
        excerpt: (data.excerpt as string) || content.slice(0, 150) + "...",
        date: (data.date as string) || new Date().toISOString(),
        tags: (data.tags as string[]) || [],
        category: (data.category as string) || "未分类",
        readTime,
        content,
        views: (data.views as number) || 0,
      };
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 下面这些函数都改成调用 getAllPosts()
export async function getLatestPosts(count = 5) {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category === category);
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.tags.includes(tag));
}

export async function searchPosts(query: string) {
  const posts = await getAllPosts();
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

// 单个文章页用这个（动态路由里直接调用）
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// 原来的 getAllPostSlugs 函数，现在在 Next.js 14 App Router 中可能不再需要导出
// 因为 generateStaticParams 可以直接通过 getAllPosts 获取 slugs
// 但为了兼容性，可以保留一个内部使用的版本
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map(post => post.slug);
}