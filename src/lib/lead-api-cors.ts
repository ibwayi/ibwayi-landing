const ALLOWED_ORIGINS = [
  "https://chatbot.ibwayi.com",
  "https://automation.ibwayi.com",
  "https://mvp.ibwayi.com",
  "https://ibwayi.com",
  "https://www.ibwayi.com",
  // Local dev origins
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

export function getCorsHeaders(
  requestOrigin: string | null,
): Record<string, string> {
  const allowed = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin);
  return {
    "Access-Control-Allow-Origin": allowed ? requestOrigin : "https://ibwayi.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function isAllowedOrigin(requestOrigin: string | null): boolean {
  if (!requestOrigin) return false;
  return ALLOWED_ORIGINS.includes(requestOrigin);
}
