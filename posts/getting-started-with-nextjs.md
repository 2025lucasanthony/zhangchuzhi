---
title: "Next.js 14 入门指南：从零到一构建现代 Web 应用"
excerpt: "深入探索 Next.js 14 的新特性，学习如何使用 App Router 构建高性能的现代 Web 应用程序。"
date: "2024-01-15"
tags: ["Next.js", "React", "TypeScript", "Web开发"]
category: "前端开发"
views: 1234
---

## 简介

Next.js 14 带来了许多激动人心的新特性，特别是 App Router 的稳定版本，它为 React 应用开发提供了全新的开发体验。在这篇文章中，我们将深入探索这些特性，并学习如何构建一个完整的现代 Web 应用。

## 什么是 Next.js？

Next.js 是一个基于 React 的全栈框架，它提供了：

- **服务端渲染 (SSR)**：提高 SEO 和首屏加载速度
- **静态站点生成 (SSG)**：生成静态 HTML 页面
- **API 路由**：构建后端 API
- **自动代码分割**：优化性能
- **文件系统路由**：直观的路由系统

## App Router 新特性

Next.js 14 引入了全新的 App Router，它基于 React Server Components，提供了：

### 1. 服务器组件

默认情况下，所有组件都是服务器组件，这意味着它们只在服务器上运行：

```tsx
// app/dashboard/page.tsx
async function Dashboard() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return <div>{json.title}</div>;
}
```

### 2. 布局组件

使用布局组件可以在页面之间共享 UI：

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

### 3. 加载状态

使用 `loading.tsx` 文件可以轻松添加加载状态：

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>加载中...</div>;
}
```

## 路由系统

App Router 使用基于文件系统的路由：

```
app/
  page.tsx          // / 路由
  about/
    page.tsx        // /about 路由
  blog/
    [slug]/
      page.tsx      // /blog/[slug] 动态路由
```

## 数据获取

### 服务器组件中的数据获取

```tsx
async function BlogPost({ slug }: { slug: string }) {
  const post = await fetch(`https://api.example.com/posts/${slug}`);
  const data = await post.json();
  
  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}
```

### 客户端组件中的数据获取

```tsx
'use client';

import { useEffect, useState } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}
```

## 样式处理

Next.js 14 支持多种样式方案：

### Tailwind CSS

```tsx
export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </div>
  );
}
```

### CSS Modules

```tsx
import styles from './page.module.css';

export default function Page() {
  return <div className={styles.container}>Hello World</div>;
}
```

## 性能优化

### 图片优化

使用 `next/image` 组件自动优化图片：

```tsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority
    />
  );
}
```

### 字体优化

使用 `next/font` 自动优化字体：

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div className={inter.className}>
      <h1>Hello World</h1>
    </div>
  );
}
```

## 最佳实践

1. **使用 TypeScript**：提供更好的类型安全和开发体验
2. **组件拆分**：保持组件小而专注
3. **性能监控**：使用 Lighthouse 和 Web Vitals
4. **SEO 优化**：正确使用 meta 标签和结构化数据
5. **错误处理**：使用 error.tsx 文件处理错误

## 总结

Next.js 14 和 App Router 为现代 Web 开发提供了强大的工具集。通过服务器组件、新的路由系统和性能优化，我们可以构建更快、更好的 Web 应用程序。

## 参考资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/rsc)
- [App Router 指南](https://nextjs.org/docs/app)

