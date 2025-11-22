"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, ChatMessage, getMessages, sendMessage, subscribeToMessages } from "@/lib/supabase";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Send, Smile } from "lucide-react";

const EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "😶‍🌫️", "😵", "😵‍💫", "🤯", "🤠", "🥳", "😎", "🤓", "🧐"];

export function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 加载初始消息
    loadMessages();

    // 订阅新消息
    const unsubscribe = subscribeToMessages((message) => {
      setMessages((prev) => [message, ...prev]);
      scrollToBottom();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading messages:", error);
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!newMessage.trim() && !selectedEmoji) return;

    const message: ChatMessage = {
      content: newMessage.trim() || selectedEmoji || "",
      emoji: selectedEmoji || undefined,
      author: "匿名用户",
      timestamp: new Date().toISOString(),
    };

    try {
      await sendMessage(message);
      setNewMessage("");
      setSelectedEmoji(null);
      setShowEmojiPicker(false);
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("发送消息失败，请检查 Supabase 配置");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-[600px]">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            还没有消息，快来发表第一条留言吧！
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id || message.timestamp}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {message.emoji || message.author?.charAt(0) || "匿"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {message.author || "匿名用户"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.created_at || message.timestamp
                      ? format(new Date(message.created_at || message.timestamp || ""), "HH:mm", {
                          locale: zhCN,
                        })
                      : ""}
                  </span>
                </div>
                <div className="text-gray-800 dark:text-gray-200 break-words">
                  {message.emoji && <span className="text-2xl mr-2">{message.emoji}</span>}
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-end space-x-2">
          <div className="relative flex-1">
            {selectedEmoji && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl">
                {selectedEmoji}
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={selectedEmoji ? "输入消息..." : "输入消息或选择表情..."}
              className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                selectedEmoji ? "pl-12" : ""
              }`}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Smile className="w-6 h-6" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 w-64 h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 grid grid-cols-8 gap-2 z-10">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:scale-125 transition-transform p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() && !selectedEmoji}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>发送</span>
          </button>
        </div>
        {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            ⚠️ 请配置 Supabase 环境变量以启用实时聊天功能
          </div>
        )}
      </div>
    </div>
  );
}

