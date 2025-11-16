import { Resend } from "resend";
import { AdminNotification } from "../emails/AdminNotification";
import { UserConfirmation } from "../emails/UserConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Validation function
const validatePayload = (data: any): data is ContactFormData => {
  if (!data || typeof data !== "object") return false;
  if (typeof data.name !== "string" || data.name.trim().length === 0) return false;
  if (typeof data.email !== "string" || !data.email.includes("@")) return false;
  if (typeof data.message !== "string" || data.message.trim().length === 0) return false;
  if (data.phone && typeof data.phone !== "string") return false;
  return true;
};

export default async function handler(req: Request) {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  try {
    // Parse request body
    const body = await req.json();

    // Validate payload
    if (!validatePayload(body)) {
      return new Response(
        JSON.stringify({
          error: "Invalid request payload. Name, email, and message are required.",
        }),
        { status: 400, headers }
      );
    }

    const { name, email, phone, message } = body;

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers }
      );
    }

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Global Mat Contact Form <onboarding@resend.dev>", // Update this with your verified domain
      to: ["clarence@globalmat.co.za"],
      subject: `New Contact Form Submission from ${name}`,
      react: AdminNotification({ name, email, phone, message }),
    });

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "Global Mat <onboarding@resend.dev>", // Update this with your verified domain
      to: [email],
      subject: "Thank you for contacting Global Mat",
      react: UserConfirmation({ name }),
    });

    // Check if both emails were sent successfully
    if (adminEmailResult.error || userEmailResult.error) {
      console.error("Email sending error:", {
        admin: adminEmailResult.error,
        user: userEmailResult.error,
      });
      throw new Error("Failed to send one or more emails");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
        ids: {
          admin: adminEmailResult.data?.id,
          user: userEmailResult.data?.id,
        },
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers }
    );
  }
}
