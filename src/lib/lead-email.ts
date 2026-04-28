import { Resend } from "resend";

export type LeadProjectType = "chatbot" | "automation" | "mvp" | "custom";

export interface LeadPayload {
  email: string;
  use_case: string;
  company_or_website?: string;
  project_type: LeadProjectType;
}

const PROJECT_LABEL: Record<LeadProjectType, string> = {
  chatbot: "Chatbot",
  automation: "Automation",
  mvp: "MVP Web App",
  custom: "Custom",
};

/**
 * Send a lead-notification email via Resend.
 *
 * - `from`: bot@ibwayi.com (must be on a Resend-verified domain).
 * - `to`: LEAD_NOTIFICATION_EMAIL (default pascal@bisinnovation.com).
 * - `replyTo`: the lead's email — clicking "Reply" in Mail.app goes
 *   directly to the lead, not to the bot address.
 *
 * Throws if RESEND_API_KEY is missing or Resend returns an error. The
 * tool's `execute` wrapper catches and surfaces a friendly failure
 * message so the bot can apologise to the user.
 */
export async function sendLeadEmail(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "bot@ibwayi.com";
  const toEmail =
    process.env.LEAD_NOTIFICATION_EMAIL ?? "pascal@bisinnovation.com";
  const projectTypeLabel = PROJECT_LABEL[lead.project_type];

  const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #18181b; margin-top: 0;">New lead from ibwayi.com chatbot</h2>

  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <tr>
      <td style="padding: 8px 0; color: #71717a; width: 140px; vertical-align: top;">Email:</td>
      <td style="padding: 8px 0; color: #18181b;"><a href="mailto:${lead.email}">${lead.email}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #71717a; vertical-align: top;">Project type:</td>
      <td style="padding: 8px 0; color: #18181b;">${projectTypeLabel}</td>
    </tr>
    ${
      lead.company_or_website
        ? `<tr>
      <td style="padding: 8px 0; color: #71717a; vertical-align: top;">Company/Website:</td>
      <td style="padding: 8px 0; color: #18181b;">${lead.company_or_website}</td>
    </tr>`
        : ""
    }
    <tr>
      <td style="padding: 8px 0; color: #71717a; vertical-align: top;">Use-case:</td>
      <td style="padding: 8px 0; color: #18181b;">${lead.use_case}</td>
    </tr>
  </table>

  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 12px;">
    Sent automatically from the chatbot widget on ibwayi.com.
    Reply directly to <a href="mailto:${lead.email}">${lead.email}</a> to follow up.
  </div>
</div>`;

  const text = `New lead from ibwayi.com chatbot

Email: ${lead.email}
Project type: ${projectTypeLabel}${
    lead.company_or_website ? `\nCompany/Website: ${lead.company_or_website}` : ""
  }
Use-case: ${lead.use_case}

Reply directly to ${lead.email} to follow up.`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Ibwayi Bot <${fromEmail}>`,
    to: [toEmail],
    replyTo: lead.email,
    subject: `New lead — ${projectTypeLabel} — ${lead.email}`,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message ?? "unknown"}`);
  }
}
