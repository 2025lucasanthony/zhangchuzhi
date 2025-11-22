export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          关于我
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              我是一名充满热情的全栈开发工程师，专注于构建现代化、高性能的 Web 应用程序。
            </p>
            <p className="text-lg leading-relaxed">
              我热爱学习新技术，喜欢解决复杂的技术挑战。在过去的几年中，我积累了丰富的
              React、Next.js、Node.js 等技术的实战经验。
            </p>
            <p className="text-lg leading-relaxed">
              除了编程，我还喜欢分享技术知识，写博客，参与开源项目。
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
              张
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

