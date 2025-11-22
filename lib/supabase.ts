import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 只在客户端运行时验证，构建时跳过
let supabase: any = null;

if (typeof window !== "undefined") {
  // 客户端环境
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not configured");
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
}

export { supabase };

// 消息表结构
export interface ChatMessage {
  id?: string;
  content: string;
  emoji?: string;
  timestamp?: string;
  author?: string;
  created_at?: string;
}

// 获取所有消息
export async function getMessages(): Promise<ChatMessage[]> {
  if (!supabase) {
    console.error("Supabase not initialized");
    return [];
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data || [];
}

// 发送消息
export async function sendMessage(message: ChatMessage): Promise<ChatMessage | null> {
  if (!supabase) {
    console.error("Supabase not initialized");
    return null;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([message])
    .select()
    .single();

  if (error) {
    console.error("Error sending message:", error);
    return null;
  }

  return data;
}

// 订阅消息更新
export function subscribeToMessages(callback: (message: ChatMessage) => void) {
  if (!supabase) {
    console.error("Supabase not initialized");
    return () => {};
  }

  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload: any) => {
        callback(payload.new as ChatMessage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
