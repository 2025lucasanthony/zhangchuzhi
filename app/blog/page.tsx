import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { BlogClientPage } from "./blog-client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "我的技术博客文章",
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const allCategories = await getAllCategories();
  const allTags = await getAllTags();

  return (
    <BlogClientPage
      allPosts={allPosts}
      allCategories={allCategories}
      allTags={allTags}
    />
  );
}

