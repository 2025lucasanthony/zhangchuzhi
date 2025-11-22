# 个人作品展示网站

一个使用 Next.js 14 (App Router) + TypeScript + Tailwind CSS 构建的超完整个人作品展示网站。

## ✨ 功能特性

- 🎨 **3D 粒子背景**：使用 @tsparticles/react 创建炫酷的粒子效果
- 🌓 **暗黑/明亮模式**：支持主题切换并持久化存储
- 🎯 **项目展示**：3D 翻转卡片效果，点击查看详情
- 📝 **博客系统**：基于 Markdown 文件，支持代码高亮和目录导航
- 💬 **实时聊天室**：使用 Supabase Realtime 实现匿名留言墙
- 📱 **响应式设计**：完美适配手机、平板、电脑
- 🚀 **一键部署**：支持 Vercel 和 GitHub Actions 自动部署
- ⚡ **性能优化**：使用 next/image 和 next/font 优化性能
- 🔍 **SEO 优化**：完整的 meta tags 和结构化数据

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **粒子效果**: @tsparticles/react
- **主题切换**: next-themes
- **Markdown 解析**: react-markdown, remark, rehype
- **代码高亮**: react-syntax-highlighter
- **实时功能**: Supabase Realtime
- **日期处理**: date-fns
- **图标**: lucide-react

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>

# 进入目录
cd Website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## ⚙️ 环境变量配置

复制 `.env.example` 文件为 `.env.local` 并填入你的配置：

```bash
cp .env.example .env.local
```

### Supabase 配置（可选，仅用于聊天室功能）

1. 访问 [Supabase](https://supabase.com) 创建项目
2. 在项目设置中获取 URL 和 Anon Key
3. 在 Supabase SQL 编辑器中运行以下 SQL 创建消息表：

```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  emoji TEXT,
  author TEXT DEFAULT '匿名用户',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用实时功能
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

4. 更新 `.env.local` 文件：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 项目结构

```
.
├── app/                    # Next.js App Router 页面
│   ├── blog/              # 博客页面
│   ├── chat/              # 聊天室页面
│   ├── projects/          # 项目展示页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── blog-post-content.tsx
│   ├── chat-room.tsx
│   ├── hero-section.tsx
│   ├── particles-background.tsx
│   └── ...
├── lib/                   # 工具函数
│   ├── posts.ts          # 博客文章处理
│   ├── projects.ts       # 项目数据
│   └── supabase.ts       # Supabase 客户端
├── posts/                 # Markdown 博客文章
├── public/               # 静态资源
└── types/                # TypeScript 类型定义
```

## 📝 添加博客文章

在 `posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
excerpt: "文章摘要"
date: "2024-01-01"
tags: ["标签1", "标签2"]
category: "分类"
views: 0
---

文章内容...
```

## 🎨 自定义主题

在 `tailwind.config.ts` 中自定义主题颜色和样式。

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 自动部署完成

### GitHub Actions 自动部署

项目已配置 GitHub Actions 工作流，推送代码到 `main` 分支会自动触发部署。

需要配置以下 Secrets：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
