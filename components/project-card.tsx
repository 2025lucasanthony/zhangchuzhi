"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative h-[400px] perspective-1000">
      <div className="relative w-full h-full preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
        {/* 正面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Link href={project.link} className="block h-full w-full">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>
        {/* 背面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              {project.title}
            </h3>
            <p className="text-white/90 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold bg-white/20 text-white rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href={project.link}
              className="text-white hover:text-white/80 transition-colors"
            >
              <ExternalLink className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

