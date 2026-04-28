"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_USER_MESSAGES = 10;

/**
 * Floating chatbot widget — bubble bottom-right, slide-in panel on click.
 *
 * AI SDK v6 hook: `useChat` returns `messages`, `sendMessage`, `status`,
 * `error`. We manage `input` state manually (the hook no longer wires
 * input/handleInputChange/handleSubmit like v3 did). Streaming arrives
 * as `UIMessage`s with `parts: UIMessagePart[]` — we render `parts.text`
 * for assistant + user.
 *
 * 10-user-message session-cap (client-side count). After cap, input
 * disabled + CTA card with View-Demos + Visit-Fiverr links. The API
 * route also enforces a 20-message-per-request hard cap.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userMessageCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <>
      {/* Floating bubble — hidden when panel is open. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed right-6 bottom-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent-brand text-white shadow-lg shadow-accent-brand/30 transition-transform hover:scale-105 active:scale-95",
          open && "pointer-events-none opacity-0",
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Slide-in chat panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-6 z-50 flex h-[600px] max-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-brand/20">
                  <MessageCircle className="h-4 w-4 text-accent-brand" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Ask about Ibwayi
                  </div>
                  <div className="text-xs text-muted-foreground">
                    AI assistant — instant answers
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-full p-1 transition-colors hover:bg-muted"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
                  Hi! I can answer questions about Ibwayi&rsquo;s services —
                  chatbots, automations, MVP web apps. What&rsquo;s on your mind?
                </div>
              )}

              {messages.map((message) => {
                const text = message.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                if (!text) return null;
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-accent-brand text-white"
                          : "bg-muted text-foreground",
                      )}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-xl bg-muted px-3 py-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:200ms]" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/40 [animation-delay:400ms]" />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                  Something went wrong. Please try again or visit Ibwayi on
                  Fiverr.
                </div>
              )}

              {limitReached && (
                <div className="space-y-3 rounded-xl border border-accent-brand/30 bg-accent-brand/10 p-4">
                  <div className="text-sm font-semibold text-foreground">
                    Want to chat with Ibwayi directly?
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Time for a real conversation. Check out the gigs or send a
                    custom message.
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/demos"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent-brand hover:underline"
                    >
                      View Demos
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    <a
                      href="https://fiverr.com/ibwayi"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Fiverr profile (opens in new tab)"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent-brand hover:underline"
                    >
                      Visit Fiverr
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  limitReached
                    ? "Visit Fiverr to continue"
                    : "Ask anything about Ibwayi..."
                }
                disabled={limitReached || isLoading}
                aria-label="Chat message"
                className="flex-1 rounded-full bg-muted px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={limitReached || isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent-brand text-white transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="pb-2 text-center text-xs text-muted-foreground/60">
              {userMessageCount}/{MAX_USER_MESSAGES} messages · powered by AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
