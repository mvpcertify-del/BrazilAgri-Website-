import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * RFQ intake handler. Receives the multipart form from <RfqForm>, emails the
 * sourcing desk with the LOI attached, and sends the buyer an automated
 * acknowledgment (Resend). Reads RESEND_API_KEY from the environment; if it
 * is absent the request fails cleanly with a helpful message rather than
 * crashing, so the site deploys before the key is provisioned.
 */
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: `Our intake desk is being provisioned. Please email your request directly to ${site.email}.`,
      },
      { status: 503 }
    );
  }

  try {
    const form = await req.formData();
    const get = (k: string) => (form.get(k)?.toString() ?? "").trim();

    const companyName = get("companyName");
    const buyerEmail = get("buyerEmail");
    const websiteUrl = get("websiteUrl");
    const category = get("category");
    const quantity = get("quantity");
    const destinationPort = get("destinationPort");
    const paymentMethod = get("paymentMethod");
    const message = get("message");

    if (!companyName || !buyerEmail || !category || !quantity || !destinationPort) {
      return NextResponse.json(
        { success: false, error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    // Optional LOI attachment.
    const attachments: { filename: string; content: Buffer }[] = [];
    const file = form.get("loiFile");
    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { success: false, error: "Attachment exceeds the 10 MB limit." },
          { status: 400 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name || "LOI", content: buffer });
    }

    const resend = new Resend(apiKey);
    const row = (k: string, v: string, accent = false) =>
      `<tr><td style="padding:8px;font-weight:bold;background:#f4f6f9;">${k}</td><td style="padding:8px;${
        accent ? "color:#134074;font-weight:bold;" : ""
      }">${v || "—"}</td></tr>`;

    // A) Inbound desk notification
    await resend.emails.send({
      from: "BrazilAgri Portal <portal@brazilagri.com>",
      to: site.email,
      reply_to: buyerEmail,
      subject: `NEW RFQ: ${companyName} (${category})`,
      attachments,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#0b2545;border:1px solid #134074;padding:20px;border-radius:8px;">
          <h2 style="color:#0b2545;border-bottom:2px solid #eeb902;padding-bottom:10px;">BrazilAgri — Sourcing Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:15px;">
            ${row("Company", companyName)}
            ${row("Buyer Contact", buyerEmail)}
            ${row("Website", websiteUrl)}
            ${row("Product Category", category, true)}
            ${row("Volume", quantity)}
            ${row("Destination Port", destinationPort)}
            ${row("Payment Instrument", paymentMethod)}
          </table>
          <p style="background:#f9f9f9;padding:12px;border-left:4px solid #eeb902;font-style:italic;">"${
            message || "No remarks provided."
          }"</p>
        </div>`,
    });

    // B) Automated buyer acknowledgment
    await resend.emails.send({
      from: `BrazilAgri Sourcing Desk <${site.email}>`,
      to: buyerEmail,
      subject: "Acknowledgment: Procurement Request — BrazilAgri",
      html: `
        <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;color:#333;margin:0 auto;border:1px solid #e0e0e0;border-radius:4px;overflow:hidden;">
          <div style="background:#0b2545;padding:30px 20px;text-align:center;border-bottom:4px solid #eeb902;">
            <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:1px;">BRAZILAGRI</h1>
            <p style="color:#eeb902;margin:5px 0 0;font-size:12px;text-transform:uppercase;">A Subsidiary of Abughazaleh Trading Company (ABCO) LLC</p>
          </div>
          <div style="padding:30px 20px;line-height:1.6;">
            <p style="font-size:16px;font-weight:bold;color:#0b2545;">Dear Procurement Team at ${companyName},</p>
            <p>Thank you for contacting the <strong>BrazilAgri</strong> sourcing operations. We have successfully received your formal request regarding <strong>${category}</strong> exports from Brazil.</p>
            <p>Our trade desk is evaluating your specifications, target volumes (${quantity}) and destination logistics (${destinationPort}). An assigned trade representative will reach out within 24–48 business hours with preliminary documentation, pricing parameters, or to finalize plant availability.</p>
            <hr style="border:0;border-top:1px solid #e0e0e0;margin:25px 0;" />
            <div style="background:#f8f9fa;padding:15px;border-left:4px solid #134074;border-radius:4px;">
              <p style="margin:0;font-size:13px;color:#555;"><strong>About Our Corporate Infrastructure:</strong><br/>BrazilAgri combines strategic origin operations in South America with the global distribution infrastructure and financial solidity of <strong>Abughazaleh Trading Company (ABCO) LLC</strong>, connecting international trade lanes reliably since 1975.</p>
            </div>
            <p style="margin-top:25px;">For amendments or supplementary certificates, reply directly to <a href="mailto:${site.email}" style="color:#134074;text-decoration:underline;">${site.email}</a>.</p>
            <p style="margin-top:30px;font-size:14px;">Sincerely,<br><strong>Trade &amp; Sourcing Desk</strong><br>BrazilAgri Operations</p>
          </div>
          <div style="background:#f4f6f9;padding:20px;text-align:center;font-size:11px;color:#777;border-top:1px solid #e0e0e0;">
            <p style="margin:0 0 5px;"><strong>BrazilAgri Sourcing Desk:</strong> São Paulo / Santos Port Logistics Hub, Brazil</p>
            <p style="margin:0 0 10px;"><strong>Corporate HQ:</strong> Abughazaleh Trading Company (ABCO), Dubai, United Arab Emirates</p>
            <p style="margin:0;border-top:1px solid #dcdcdc;padding-top:10px;">© ${new Date().getFullYear()} BrazilAgri. All rights reserved. Confidentiality Notice Applies.</p>
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RFQ processing error:", err);
    return NextResponse.json(
      {
        success: false,
        error: `We could not process your request automatically. Please email ${site.email}.`,
      },
      { status: 500 }
    );
  }
}
