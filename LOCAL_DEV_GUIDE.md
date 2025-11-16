# Local Development Guide - Fix 404 Error

## 🔴 Problem
Getting a 404 error when submitting the contact form:
```
JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
```

## ✅ Solution

The issue is that **Vite dev server doesn't run Netlify Functions**. You need to use **Netlify Dev** instead.

---

## 🚀 Quick Fix (Recommended)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Stop your current dev server
Press `Ctrl+C` to stop the running `yarn dev` or `npm run dev`

### Step 3: Start Netlify Dev
```bash
npm run dev
```
or
```bash
netlify dev
```

### Step 4: Access your site
- Your site will now be at: **http://localhost:8888**
- Functions will work at: **http://localhost:8888/.netlify/functions/send-email**

---

## 📝 What Changed?

I've updated your `package.json` scripts:

**Before:**
```json
"dev": "vite"
```

**After:**
```json
"dev": "netlify dev",
"dev:vite": "vite"  // If you still want plain Vite
```

---

## 🔧 How Netlify Dev Works

Netlify Dev runs:
1. ✅ Your Vite frontend (on port 5173 internally)
2. ✅ Your serverless functions (on port 8888)
3. ✅ Proxies everything together seamlessly

This matches exactly how it works in production on Netlify!

---

## 🧪 Testing the Contact Form

1. Start the dev server: `npm run dev`
2. Open: http://localhost:8888
3. Scroll to the contact form
4. Fill out:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: 064 550 4846
   - Message: Testing the contact form
5. Click "Request Quote"
6. You should see: ✅ "Thank you! We'll be in touch soon."

---

## 📧 Check Your Emails

After successful submission:
1. **Admin email** → Check `clarence@globalmat.co.za`
2. **User confirmation** → Check the email you entered in the form
3. **Resend Dashboard** → View sent emails at https://resend.com/emails

---

## 🐛 Troubleshooting

### "netlify: command not found"
```bash
npm install -g netlify-cli
```

### Port 8888 already in use
```bash
netlify dev --port 9999
```

### Still getting 404
1. Check that `.env` file exists with `RESEND_API_KEY`
2. Restart Netlify Dev: `Ctrl+C` then `npm run dev`
3. Check function exists: `netlify/functions/send-email.ts`

### "RESEND_API_KEY is not set"
1. Make sure `.env` file exists in project root
2. Check it contains: `RESEND_API_KEY=re_your_key_here`
3. Restart the dev server

### Emails not sending
1. Check Resend dashboard for errors
2. Verify API key is correct
3. Check function logs in terminal

---

## 🎯 Alternative: Plain Vite (Not Recommended for Testing)

If you want to use plain Vite without functions:

```bash
npm run dev:vite
```

**Note:** Contact form won't work with this method. Use for UI development only.

---

## 📦 Production Deployment

When you deploy to Netlify:
1. Push your code to GitHub
2. Netlify automatically detects `netlify.toml`
3. Functions are deployed automatically
4. Everything works! ✨

---

## ✅ Checklist

- [ ] Netlify CLI installed globally
- [ ] `.env` file exists with `RESEND_API_KEY`
- [ ] Running `npm run dev` (not `yarn dev` or `vite`)
- [ ] Accessing http://localhost:8888 (not 5173)
- [ ] Contact form submits successfully
- [ ] Emails received in inbox

---

**You're all set! The contact form should now work perfectly. 🎉**
