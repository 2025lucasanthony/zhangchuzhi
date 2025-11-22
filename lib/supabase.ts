import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined. Please set it in your .env.local file.");
}
if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined. Please set it in your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        callback(payload.new as ChatMessage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

