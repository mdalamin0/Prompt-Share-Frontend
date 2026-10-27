/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, User, Loader2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface IMessage {
  role: "user" | "model";
  text: string;
}

interface LiveChatInterfaceProps {
  initialPromptContext?: string;
}

export default function LiveChatInterface({
  initialPromptContext = "",
}: LiveChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false); 

  const chatHistoryForBackend = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  }));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isAiTyping, isLoading]);

  const consumeStream = useCallback(async (response: Response) => {
    if (!response.body) throw new Error("ReadableStream not supported.");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let buffer = "";

    setMessages((prev) => [...prev, { role: "model", text: "" }]);
    setIsAiTyping(true);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data: ")) {
          try {
            const parsed = JSON.parse(trimmed.replace("data: ", ""));
            if (parsed.text) {
              setIsLoading(false);
              setMessages((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;
                if (updated[lastIndex] && updated[lastIndex].role === "model") {
                  updated[lastIndex] = {
                    ...updated[lastIndex],
                    text: updated[lastIndex].text + parsed.text,
                  };
                }
                return updated;
              });
            }
          } catch (e) {
            console.error("Parsing error", e);
          }
        }
      }
    }
  }, []); 

  useEffect(() => {
    if (!initialPromptContext) return;

    const sendInitialPrompt = async () => {
      try {
        setIsLoading(true);
        setMessages([{ role: "user", text: initialPromptContext }]);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/send-message`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: initialPromptContext,
              history: [],
            }),
          },
        );

        if (!response.ok) throw new Error("Failed to initialize AI stream.");
        await consumeStream(response);
      } catch (error: any) {
        toast.error("Failed to bootstrap secure AI session link.", {
          description: error?.message || "Verify backend network connection.",
        });
      } finally {
        setIsLoading(false);
        setIsAiTyping(false);
      }
    };

    sendInitialPrompt();
  }, [initialPromptContext, consumeStream]); 

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isAiTyping) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/send-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            history: chatHistoryForBackend,
          }),
        },
      );

      if (!response.ok) throw new Error("Server transaction fault.");
      await consumeStream(response);
    } catch (error: any) {
      toast.error("Transmission fault. Failed to synchronize response.", {
        description: error?.message || "Check your backend cluster state.",
      });
    } finally {
      setIsLoading(false);
      setIsAiTyping(false);
    }
  };

    const handleCopyText = async (text: string) => {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", {
          description: "Message text has been successfully copied.",
        });
      } catch (err) {
        toast.error("Failed to copy text.");
      }
    };

  return (
    <div className="flex flex-col h-screen w-full min-w-0 bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-muted/10 [scrollbar-width:thin]">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          if (!isUser && !msg.text && isLoading && !isAiTyping) return null;

          return (
            <div
              key={index}
              className={`flex w-full items-start gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`p-2 rounded-xl border shrink-0 ${isUser ? "bg-primary text-primary-foreground border-primary/20" : "bg-secondary text-primary border-border/40"}`}
              >
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="flex flex-col gap-1 max-w-[85%] group">
                <div
                  className={`px-4 py-2 text-xs leading-relaxed rounded-2xl shadow-sm whitespace-pre-wrap break-words ${isUser ? "bg-primary text-primary-foreground rounded-tr-none font-medium" : "bg-card text-foreground border border-border/60 rounded-tl-none font-medium"}`}
                >
                  {msg.text ||
                    (isAiTyping && index === messages.length - 1 ? "..." : "")}
                </div>
                {!isUser && msg.text && (
                  <button
                  type="button"
                    onClick={() => handleCopyText(msg.text)}
                    className="self-start mt-0.5 p-1.5 text-muted-foreground hover:text-foreground transition-opacity rounded-full border border-transparent hover:border-border/40 hover:bg-muted/50"
                  >
                    <Copy size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex w-full items-start gap-3 max-w-xl mr-auto animate-pulse">
            <div className="p-2 rounded-xl bg-secondary border border-border/40 text-primary shrink-0">
              <Loader2 size={14} className="animate-spin" />
            </div>
            <div className="bg-card border border-border/60 p-4 rounded-2xl rounded-tl-none w-24 h-9 flex items-center justify-center">
              <span className="flex gap-1">
                <span
                  className="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="size-1.5 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border bg-card shrink-0 sticky bottom-0 w-full z-10">
        <form
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isAiTyping}
            placeholder={
              isLoading || isAiTyping
                ? "AI pipeline working..."
                : "Type a message or trigger command..."
            }
            className="h-11 pl-4 text-xs bg-muted/30 border-border/60"
          />
          <Button
            type="submit"
            disabled={isLoading || isAiTyping || !input.trim()}
            className="h-11 px-4 bg-primary text-primary-foreground font-bold shadow-sm transition-transform hover:-translate-y-0.5 shrink-0 flex items-center justify-center"
          >
            <Send size={14} strokeWidth={2.5} />
          </Button>
        </form>
      </div>
    </div>
  );
}
