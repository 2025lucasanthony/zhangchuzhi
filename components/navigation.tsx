"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { id: "about", label: "关于我", href: "#about" },
  { id: "skills", label: "技能", href: "#skills" },
  { id: "projects", label: "项目", href: "#projects" },
  { id: "blog", label: "博客", href: "#blog" },
  { id: "contact", label: "联系我", href: "#contact" },
  { id: "chat", label: "聊天室", href: "/chat" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        // Skip external links or full page navigation links for scroll detection
        if (item.href && !item.href.startsWith("#")) {
          return null;
        }
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const current = sections.find(
        (section) => section.top <= 100 && section.bottom >= 100
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-8 py-4">
          {navItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href || "#"}
                onClick={(e) => {
                  if (item.href?.startsWith("#")) {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id && item.href?.startsWith("#")
                    ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

