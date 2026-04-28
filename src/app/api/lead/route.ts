import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCorsHeaders, isAllowedOrigin } from "@/lib/lead-api-cors";
import { sendLeadEmail } from "@/lib/lead-email";

export const runtime = "nodejs";

// Server-side mirror of @ai-templates/lead-modal's submit payload schema.
const leadPayloadSchema = z.object({
  service: z.enum(["chatbot", "automation", "mvp"]),
  industry: z.string().min(1).max(100),
  email: z.string().email().max(254),
  detail: z.string().max(2000).optional(),
  phone: z.string().max(50).optional(),
});

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (origin && !isAllowedOrigin(origin)) {
    return NextResponse.json(
      { error: "Origin not allowed" },
      { status: 403, headers: corsHeaders },
    );
  }

  let payload: z.infer<typeof leadPayloadSchema>;
  try {
    const body = await req.json();
    const parsed = leadPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.issues },
        { status: 400, headers: corsHeaders },
      );
    }
    payload = parsed.data;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: corsHeaders },
    );
  }

  // Build a single use_case string — sendLeadEmail formats this into the
  // email body (table row + plain-text block).
  const useCaseLines = [`Industry: ${payload.industry}`];
  if (payload.detail) useCaseLines.push(`Details: ${payload.detail}`);
  if (payload.phone) useCaseLines.push(`Phone: ${payload.phone}`);
  useCaseLines.push(`Source: Demo-App lead modal (service=${payload.service})`);

  try {
    await sendLeadEmail({
      email: payload.email,
      use_case: useCaseLines.join("\n"),
      project_type: payload.service,
    });

    return NextResponse.json(
      { ok: true, message: "Lead received" },
      { status: 200, headers: corsHeaders },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Email delivery failed", detail: message },
      { status: 502, headers: corsHeaders },
    );
  }
}
