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

interface UserConfirmationProps {
  name: string;
}

export const UserConfirmation = ({ name }: UserConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Thank You for Contacting Us!</Heading>
            <Text style={subtitle}>Global Mat - Premium Custom Mat Supplies</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {name},</Text>

            <Text style={paragraph}>
              Thank you for reaching out to Global Mat! We've received your inquiry
              and our team will review it shortly.
            </Text>

            <Text style={paragraph}>
              We specialize in premium custom mat supplies for homes, offices, salons,
              and shops. Whether you need personalized doormats with names, quotes, or
              logos, we're here to help bring your vision to life.
            </Text>

            <Text style={paragraph}>
              One of our representatives will get back to you within 24-48 hours with
              a detailed quote and next steps.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                <strong>What happens next?</strong>
              </Text>
              <Text style={highlightText}>
                ✓ We'll review your requirements
              </Text>
              <Text style={highlightText}>
                ✓ Prepare a custom quote for you
              </Text>
              <Text style={highlightText}>
                ✓ Contact you with design options
              </Text>
            </Section>

            <Text style={paragraph}>
              If you have any urgent questions, feel free to contact us directly:
            </Text>

            <Text style={contactInfo}>
              <strong>Phone:</strong> 064 550 4846
              <br />
              <strong>Email:</strong> clarence@globalmat.co.za
              <br />
              <strong>Contact Person:</strong> Clarence Chavangu
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated confirmation email from Global Mat.
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

export default UserConfirmation;

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

const greeting = {
  color: "hsl(215, 25%, 15%)",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 24px",
};

const paragraph = {
  color: "hsl(215, 15%, 45%)",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const highlightBox = {
  backgroundColor: "hsl(40, 45%, 95%)",
  borderLeft: "4px solid hsl(40, 45%, 55%)",
  padding: "20px",
  margin: "24px 0",
  borderRadius: "4px",
};

const highlightText = {
  color: "hsl(215, 25%, 15%)",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "4px 0",
};

const contactInfo = {
  color: "hsl(215, 15%, 45%)",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "16px 0",
  padding: "16px",
  backgroundColor: "hsl(210, 20%, 92%)",
  borderRadius: "8px",
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
