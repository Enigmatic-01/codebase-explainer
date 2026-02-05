import React, { useState } from "react";
import { ChatSession, Message } from "../types";
import { log } from "console";

const BACK_API =import.meta.env.VITE_BACK_API;

interface Props {
  chatId: string;
  userId: string;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const ChatInput: React.FC<Props> = ({
  chatId,
  userId,
  setChats,
  isLoading,
  setIsLoading,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);

    // ✅ Add user message to UI safely
    const userMessage: Message = {
    msg_id: Date.now().toString(),
    role: "user",
    text: trimmed,
    timestamp: Date.now(),
};

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...(chat.messages || []), userMessage] }
          : chat
      )
    );

    setValue("");

    try {
      
      const res = await fetch(`${BACK_API}/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query: trimmed, user_id: userId, chat_id: chatId }),
      });

      if (!res.ok) {
        console.error("Failed to send query:", await res.text());
        setIsLoading(false);
        return;
      }

     
      const aiId = (Date.now() + 1).toString();
      setChats(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...(chat.messages || []),
                  { id: aiId, role: "model", text: "", timestamp: Date.now() },
                ],
              }
            : chat
        )
      );

      // ✅ Start streaming AI response (SSE)
      const eventSource = new EventSource(
        `${BACK_API}/rag/query?chat_id=${chatId}&user_id=${userId}`
      );

      eventSource.onmessage = event => {
        const chunk = event.data;
        setChats(prev =>
          prev.map(chat =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages?.map(msg =>
                    msg.id === aiId ? { ...msg, text: msg.text + chunk } : msg
                  ) || [],
                }
              : chat
          )
        );
      };

      eventSource.addEventListener("end", () => {
        eventSource.close();
        setIsLoading(false);
      });

      eventSource.onerror = () => {
        eventSource.close();
        setIsLoading(false);
      };
    } catch (err) {
      console.error("Chat error:", err);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4.5 border-t dark:border-gray-800 flex gap-2"
    >
     <input
  value={value}
  onChange={e => setValue(e.target.value)}
  placeholder="Ask something about the repo..."
  disabled={isLoading}
  className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-brand-500"
/>
<button
  type="submit"
  disabled={isLoading || !value.trim()}
  className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400
             text-white font-medium shadow transition-shadow duration-150"
>
  {isLoading ? "..." : "Send"}
</button>

     
    </form>
  );
};

export default ChatInput;
