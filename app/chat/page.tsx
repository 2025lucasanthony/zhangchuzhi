"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ChatRoom } from "@/components/chat-room";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          实时聊天室
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          匿名留言墙，支持表情包和时间戳
        </p>
        <ChatRoom />
      </div>
    </div>
  );
}
