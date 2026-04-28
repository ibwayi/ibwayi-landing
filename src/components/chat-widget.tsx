"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RateLimitInfo {
  resetIn: number;
  /** When the limit was first hit (epoch ms) — used for the live countdown. */
  hitAt: number;
}

/**
 * Subset of the `tool-submit_lead` UIMessagePart shape we render. AI SDK
 * v6 emits this as `{ type: "tool-<name>", state, input, output, ... }`
 * with state cycling: input-streaming → input-available →
 * output-available (or output-error).
 */
type LeadToolPart = {
  type: "tool-submit_lead";
  state:
    | "input-streaming"
    | "input-available"
    | "output-available"
    | "output-error"
    | "approval-requested"
    | "approval-responded";
  output?: { success: boolean; message: string };
  errorText?: string;
};

/**
 * Floating chatbot widget — bubble bottom-right, slide-in panel on click.
 *
 * Rate-limit handling: server enforces 10 messages per IP per hour via
 * Upstash Redis. When the API returns 429, the response body has
 * `{ error: "rate_limit", resetIn: <seconds> }`. We intercept the
 * response with a custom fetch on DefaultChatTransport, stash the
 * resetIn into local state, and switch the panel into "limit reached"
 * mode (CTA card + disabled input + live countdown). State auto-clears
 * after resetIn elapses so the user can try again without a refresh.
 *
 * The visible "X/10 messages" counter from 7.5a was removed — server
 * is the source of truth and a visible counter felt cheap.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Custom fetch for the transport: detects 429 and surfaces the
  // resetIn into React state. Returning the response normally lets
  // AI SDK turn it into an Error (we just suppress that error in the
  // UI when rateLimit is set).
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        async fetch(...args) {
          const res = await fetch(...args);
          if (res.status === 429) {
            try {
              const body = (await res.clone().json()) as {
                resetIn?: number;
              };
              setRateLimit({
                resetIn: body.resetIn ?? 3600,
                hitAt: Date.now(),
              });
            } catch {
              setRateLimit({ resetIn: 3600, hitAt: Date.now() });
            }
          }
          return res;
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";
  const limitReached = rateLimit !== null;

  // Live countdown — re-tick every 30s while the limit is active.
  useEffect(() => {
    if (!rateLimit) return;
    const tick = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(tick);
  }, [rateLimit]);

  // Auto-clear the limit state once resetIn has elapsed.
  useEffect(() => {
    if (!rateLimit) return;
    const ms = rateLimit.resetIn * 1000;
    const t = setTimeout(() => setRateLimit(null), ms);
    return () => clearTimeout(t);
  }, [rateLimit]);

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

  // Minutes remaining until reset, derived from hitAt + resetIn.
  const resetMinutesLeft = rateLimit
    ? Math.max(
        1,
        Math.ceil(
          (rateLimit.hitAt + rateLimit.resetIn * 1000 - now) / 60_000,
        ),
      )
    : 0;

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
                    AI assistant. Instant answers.
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

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
                  Hi! I can answer questions about Ibwayi&rsquo;s services:
                  chatbots, automations, MVP web apps. What&rsquo;s on your mind?
                </div>
              )}

              {messages.map((message) => {
                const text = message.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");

                return (
                  <div key={message.id} className="space-y-2">
                    {text && (
                      <div
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
                    )}
                    {message.parts.map((part, idx) => {
                      if (part.type !== "tool-submit_lead") return null;
                      return (
                        <LeadStatusBlock
                          key={`${message.id}-lead-${idx}`}
                          part={part as unknown as LeadToolPart}
                        />
                      );
                    })}
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

              {/* Generic error — suppressed when the rate-limit CTA covers it. */}
              {error && !limitReached && (
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
                  <div className="text-xs text-muted-foreground/70">
                    Limit resets in ~{resetMinutesLeft} minute
                    {resetMinutesLeft === 1 ? "" : "s"}.
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

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
                    ? "You've reached the message limit for this hour. Visit Fiverr to continue →"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LeadStatusBlock({ part }: { part: LeadToolPart }) {
  if (part.state === "output-available" && part.output) {
    const { success, message } = part.output;
    return (
      <div
        className={cn(
          "rounded-xl border px-3 py-2 text-sm",
          success
            ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
            : "border-destructive/30 bg-destructive/10 text-destructive",
        )}
      >
        {success ? "✓ " : "⚠ "}
        {message}
      </div>
    );
  }
  if (part.state === "output-error") {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        ⚠ Couldn&rsquo;t reach Ibwayi right now. Please try again or visit
        fiverr.com/ibwayi.
      </div>
    );
  }
  // input-streaming or input-available — submit is in flight.
  return (
    <div className="rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
      Submitting your details to Ibwayi…
    </div>
  );
}
