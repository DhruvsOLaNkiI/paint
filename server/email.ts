import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const ownerEmail = process.env.OWNER_EMAIL;
const fromEmail =
  process.env.RESEND_FROM_EMAIL || 'BrushUpHomes <onboarding@resend.dev>';

const resend = apiKey ? new Resend(apiKey) : null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:500;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export async function notifyOwnerNewBooking(booking: {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  surveyDate: string;
  surveyTime: string;
  notes?: string;
}): Promise<void> {
  if (!resend || !ownerEmail) {
    console.warn(
      '[email] Skipped booking notification — set RESEND_API_KEY and OWNER_EMAIL in .env'
    );
    return;
  }

  const subject = `New Survey Booking — ${booking.name} · ${booking.service}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f5f7fa;">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
        <p style="margin:0 0 4px;color:#1b4f72;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">BrushUpHomes</p>
        <h1 style="margin:0 0 16px;color:#0f172a;font-size:22px;">New Survey Booking</h1>
        <p style="margin:0 0 20px;color:#64748b;font-size:14px;">A customer just confirmed a free survey on the website.</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', booking.name)}
          ${row('Mobile', booking.phone)}
          ${row('Email', booking.email)}
          ${row('Service', booking.service)}
          ${row('Survey Date', formatDateLabel(booking.surveyDate))}
          ${row('Time Slot', booking.surveyTime)}
          ${row('Address', booking.address)}
          ${booking.notes ? row('Notes', booking.notes) : ''}
        </table>
        <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;">Open /admin on your site to manage this booking and add a quotation.</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [ownerEmail],
    replyTo: booking.email,
    subject,
    html,
  });

  if (error) {
    console.error('[email] Failed to send booking notification:', error);
    console.error(
      '[email] Tip: with onboarding@resend.dev, OWNER_EMAIL must be your Resend signup email. Or verify a domain at resend.com/domains.'
    );
    return;
  }

  console.log(`[email] Booking notification sent to ${ownerEmail}`);
}

export async function notifyOwnerNewEnquiry(enquiry: {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  specs: string;
  source: string;
}): Promise<void> {
  if (!resend || !ownerEmail) {
    console.warn(
      '[email] Skipped enquiry notification — set RESEND_API_KEY and OWNER_EMAIL in .env'
    );
    return;
  }

  const subject = `New Enquiry — ${enquiry.name} · ${enquiry.service || 'General'}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f5f7fa;">
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
        <p style="margin:0 0 4px;color:#1b4f72;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">BrushUpHomes</p>
        <h1 style="margin:0 0 16px;color:#0f172a;font-size:22px;">New Contact Enquiry</h1>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', enquiry.name)}
          ${row('Mobile', enquiry.phone)}
          ${row('Email', enquiry.email)}
          ${row('Service', enquiry.service || '—')}
          ${row('Address', enquiry.address || '—')}
          ${row('Details', enquiry.specs || '—')}
          ${row('Source', enquiry.source)}
        </table>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [ownerEmail],
    replyTo: enquiry.email,
    subject,
    html,
  });

  if (error) {
    console.error('[email] Failed to send enquiry notification:', error);
    return;
  }

  console.log(`[email] Enquiry notification sent to ${ownerEmail}`);
}
