export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  content?: string;
  technologies?: string[];
  features?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  readTime: number;
  content: string;
  views: number;
}

export interface Message {
  id: string;
  content: string;
  emoji?: string;
  timestamp: string;
  author?: string;
}

