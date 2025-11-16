# Resend Email Integration Setup Guide

This guide will help you set up the Resend email service for the Global Mat contact form.

## 📋 Prerequisites

- Node.js 18+ installed
- A Resend account (free tier available)
- Netlify account for deployment (or Vercel)

## 🚀 Quick Setup

### 1. Install Dependencies

The required packages have been added to your project:

```bash
npm install
```

**Installed packages:**
- `resend` - Email sending service
- `@react-email/components` - React email templates
- `@netlify/functions` - Netlify serverless functions (dev dependency)

### 2. Get Your Resend API Key

1. Sign up at [https://resend.com](https://resend.com)
2. Navigate to **API Keys** in your dashboard
3. Click **Create API Key**
4. Copy your API key (starts with `re_`)

### 3. Configure Environment Variables

#### Local Development

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your Resend API key to `.env`:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

#### Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key

#### Vercel Deployment (Alternative)

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key

### 4. Configure Your Email Domain (Important!)

By default, the API uses `onboarding@resend.dev` as the sender. This works for testing but has limitations.

**For production**, you should:

1. Add and verify your domain in Resend dashboard
2. Update the `from` field in both API files:

**File: `netlify/functions/send-email.ts`** (lines 76 & 84)
```typescript
from: "Global Mat Contact Form <noreply@yourdomain.com>",
// and
from: "Global Mat <noreply@yourdomain.com>",
```

**File: `api/send-email.ts`** (lines 75 & 83)
```typescript
from: "Global Mat Contact Form <noreply@yourdomain.com>",
// and
from: "Global Mat <noreply@yourdomain.com>",
```

Replace `yourdomain.com` with your verified domain.

## 📁 Project Structure

```
carpet-creations-hub/
├── emails/
│   ├── AdminNotification.tsx    # Email sent to clarence@globalmat.co.za
│   └── UserConfirmation.tsx     # Email sent to customer
├── netlify/
│   └── functions/
│       └── send-email.ts        # Netlify serverless function
├── api/
│   └── send-email.ts            # Generic API route
├── src/
│   └── components/
│       └── ContactForm.tsx      # Updated with email integration
├── .env.example                 # Environment variable template
├── .env                         # Your actual API key (gitignored)
└── netlify.toml                 # Netlify configuration
```

## 🧪 Testing Locally

### Option 1: Using Netlify Dev (Recommended)

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Run the development server:
   ```bash
   netlify dev
   ```

3. Your site will be available at `http://localhost:8888`
4. The serverless function will work at `/.netlify/functions/send-email`

### Option 2: Using Vite Dev Server

```bash
npm run dev
```

**Note:** Serverless functions won't work with plain Vite dev server. You'll need to deploy to test the email functionality, or use Netlify Dev.

## 📧 Email Flow

When a user submits the contact form:

1. **User fills out form** with name, email, phone (optional), and message
2. **Form submits** to `/.netlify/functions/send-email`
3. **API validates** the payload
4. **Two emails are sent**:
   - **Admin notification** → `clarence@globalmat.co.za` with customer details
   - **User confirmation** → Customer's email with thank you message
5. **Success toast** appears confirming submission
6. **Form resets** automatically

## 🎨 Email Templates

Both email templates use React components with inline styles for maximum compatibility:

### AdminNotification.tsx
- Displays customer information
- Shows the submitted message
- Branded with Global Mat colors
- Professional layout

### UserConfirmation.tsx
- Personalized greeting
- Thank you message
- What happens next section
- Contact information
- Branded footer

## 🚢 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings (already in `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. Add environment variable `RESEND_API_KEY`
5. Deploy!

### Deploy to Vercel (Alternative)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable in Vercel dashboard
4. Redeploy

## 🔧 Troubleshooting

### "Email service not configured" error
- Check that `RESEND_API_KEY` is set in your environment variables
- Verify the API key is correct and starts with `re_`

### "Failed to send email" error
- Check Resend dashboard for error logs
- Verify your email domain is verified (if using custom domain)
- Check that recipient email is valid

### Form submits but no emails received
- Check spam/junk folders
- Verify Resend API key has send permissions
- Check Netlify function logs for errors

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Restart your IDE/TypeScript server

### CORS errors
- The API includes CORS headers for cross-origin requests
- If issues persist, check Netlify function logs

## 📊 Monitoring

### Resend Dashboard
- View sent emails
- Check delivery status
- Monitor API usage
- View error logs

### Netlify Function Logs
1. Go to Netlify dashboard
2. Navigate to **Functions** tab
3. Click on `send-email` function
4. View real-time logs

## 🔒 Security Notes

- ✅ `.env` is gitignored - never commit API keys
- ✅ API key is server-side only (not exposed to client)
- ✅ Form validation prevents malicious input
- ✅ CORS headers configured for security
- ✅ Rate limiting handled by Resend

## 📝 Customization

### Change Recipient Email

Edit `netlify/functions/send-email.ts` line 76:
```typescript
to: ["your-email@example.com"],
```

### Modify Email Templates

Edit files in `/emails/` directory:
- `AdminNotification.tsx` - Admin email layout
- `UserConfirmation.tsx` - Customer email layout

### Update Form Fields

Edit `src/components/ContactForm.tsx` to add/remove fields. Remember to:
1. Update `formData` state
2. Update form JSX
3. Update API validation in `send-email.ts`

## 🆘 Support

- **Resend Docs**: [https://resend.com/docs](https://resend.com/docs)
- **React Email Docs**: [https://react.email/docs](https://react.email/docs)
- **Netlify Functions**: [https://docs.netlify.com/functions/overview/](https://docs.netlify.com/functions/overview/)

## ✅ Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Created `.env` file with `RESEND_API_KEY`
- [ ] Tested locally with Netlify Dev
- [ ] Updated sender email domain (for production)
- [ ] Added environment variable to Netlify/Vercel
- [ ] Deployed and tested on production
- [ ] Verified emails are being received
- [ ] Checked spam folders

---

**Your contact form is now ready to send emails! 🎉**
