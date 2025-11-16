import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const AdminNotification = ({
  name,
  email,
  phone,
  message,
}: AdminNotificationProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>New Contact Form Submission</Heading>
            <Text style={subtitle}>Global Mat - Premium Custom Mat Supplies</Text>
          </Section>

          <Section style={content}>
            <Text style={label}>Customer Name:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email Address:</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone Number:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Text style={label}>Message:</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the Global Mat contact form.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Global Mat. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotification;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 40px",
  backgroundColor: "hsl(215, 50%, 20%)",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 8px",
  padding: "0",
};

const subtitle = {
  color: "hsl(40, 45%, 55%)",
  fontSize: "16px",
  margin: "0",
  padding: "0",
};

const content = {
  padding: "32px 40px",
};

const label = {
  color: "hsl(215, 25%, 15%)",
  fontSize: "14px",
  fontWeight: "600",
  margin: "24px 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  color: "hsl(215, 15%, 45%)",
  fontSize: "16px",
  margin: "0 0 16px",
  lineHeight: "24px",
};

const messageBox = {
  color: "hsl(215, 15%, 45%)",
  fontSize: "16px",
  margin: "0 0 16px",
  lineHeight: "24px",
  padding: "16px",
  backgroundColor: "hsl(210, 20%, 92%)",
  borderRadius: "8px",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "32px 40px",
  borderTop: "1px solid hsl(210, 20%, 88%)",
};

const footerText = {
  color: "hsl(215, 15%, 45%)",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "4px 0",
  textAlign: "center" as const,
};
