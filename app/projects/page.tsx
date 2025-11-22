import { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "项目展示",
  description: "查看我的所有项目作品",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          项目展示
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

