import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Resend } from "resend";
import { AdminNotification } from "../../emails/AdminNotification";
import { UserConfirmation } from "../../emails/UserConfirmation";

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

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Initialize Resend inside the handler to ensure env vars are available
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || "{}");

    // Validate payload
    if (!validatePayload(body)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Invalid request payload. Name, email, and message are required.",
        }),
      };
    }

    const { name, email, phone, message } = body;

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Email service not configured" }),
      };
    }

    // TEMPORARY: Resend free tier only allows sending to verified email
    // Remove this check after verifying a domain
    if (email !== "mollo.t.mponya@gmail.com") {
      console.warn(`Email to ${email} blocked - Resend requires domain verification for non-verified emails`);
      // Still return success to user, but log the limitation
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Form submitted successfully. Note: Email delivery requires domain verification.",
          note: "Currently in test mode - emails only sent to verified address"
        }),
      };
    }

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Global Mat Contact Form <onboarding@resend.dev>", // Update this with your verified domain
      to: ["mollo.t.mponya@gmail.com"], // Temporarily using your verified email for testing
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Emails sent successfully",
        ids: {
          admin: adminEmailResult.data?.id,
          user: userEmailResult.data?.id,
        },
      }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send email. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
