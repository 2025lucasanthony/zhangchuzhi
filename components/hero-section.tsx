"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:your@email.com", label: "Email" },
];

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-float">
          张黜之
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
          全栈开发工程师
        </p>
        <div className="flex justify-center space-x-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

