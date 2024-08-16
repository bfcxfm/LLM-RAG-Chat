"use client";

import { title } from "@/components/primitives";
import { useChat } from "ai/react";
import { useState } from "react";

export default function ChatPage() {
  const [waitingForAI, setWaitingForAI] = useState<Boolean>(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold text-left">{m.role}</div>
              <p className="text-left">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          className="fixed bottom-10 w-4/5 max-w-md p-2 mb-8 mx-auto border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Ask me about..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
