import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "电商平台",
    description: "一个全功能的电商平台，包含商品管理、购物车、支付等功能。",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    tags: ["React", "Next.js", "TypeScript"],
    link: "/projects/1",
    github: "https://github.com",
  },
  {
    id: "2",
    title: "任务管理应用",
    description: "一个美观的任务管理应用，支持团队协作和实时同步。",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    tags: ["React", "Node.js", "MongoDB"],
    link: "/projects/2",
    github: "https://github.com",
  },
  {
    id: "3",
    title: "博客系统",
    description: "基于 Markdown 的博客系统，支持代码高亮和 SEO 优化。",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800",
    tags: ["Next.js", "Markdown", "Tailwind CSS"],
    link: "/projects/3",
    github: "https://github.com",
  },
  {
    id: "4",
    title: "数据可视化平台",
    description: "强大的数据可视化平台，支持多种图表类型和实时数据更新。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    tags: ["React", "D3.js", "Python"],
    link: "/projects/4",
    github: "https://github.com",
  },
  {
    id: "5",
    title: "社交网络应用",
    description: "现代化的社交网络应用，支持实时聊天和内容分享。",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    tags: ["React", "GraphQL", "PostgreSQL"],
    link: "/projects/5",
    github: "https://github.com",
  },
  {
    id: "6",
    title: "移动应用",
    description: "跨平台移动应用，支持 iOS 和 Android。",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    tags: ["React Native", "TypeScript", "Firebase"],
    link: "/projects/6",
    github: "https://github.com",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

