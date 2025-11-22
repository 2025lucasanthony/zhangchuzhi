import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject } from "@/lib/projects";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = getProject(params.id);
  if (!project) {
    return {
      title: "项目未找到",
    };
  }
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回项目列表</span>
        </Link>

        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>查看代码</span>
            </Link>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>访问项目</span>
            </Link>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            项目详情
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            这是一个功能完整的项目，展示了我在前端开发、后端开发和全栈开发方面的技能。
            项目使用了现代化的技术栈，具有良好的代码结构和用户体验。
          </p>
          {project.features && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                主要功能
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
          {project.technologies && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-semibold bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

