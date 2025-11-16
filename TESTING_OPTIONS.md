# Testing the Contact Form - Multiple Options

The Netlify Dev + Vite combination has some compatibility issues. Here are your options:

---

## ✅ Option 1: Deploy to Netlify (RECOMMENDED - Easiest)

This is the fastest way to test the email functionality:

### Steps:

1. **Stop the current dev server** (Ctrl+C if running)

2. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add Resend email integration"
   git push
   ```

3. **Deploy on Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings from `netlify.toml`

4. **Add Environment Variable**:
   - Go to Site settings → Environment variables
   - Add: `RESEND_API_KEY` = `re_5HyWL4n7_FbGpRqXeWEhp64DpBD9Vdch2`

5. **Deploy and Test**:
   - Netlify will build and deploy automatically
   - Visit your live site
   - Test the contact form
   - Check emails!

**This is the most reliable way to test since it matches production exactly.**

---

## ✅ Option 2: Simple Vite Dev Server (UI Testing Only)

For UI development without email functionality:

```bash
npm run dev
```

This runs Vite on port 8888. The contact form won't send emails, but you can:
- Test the UI
- Test form validation
- Test styling and responsiveness

**Note:** You'll get a 404 error when submitting the form (expected).

---

## ✅ Option 3: Kill Port 8888 and Retry Netlify Dev

If you want to use Netlify Dev locally:

### Windows:

1. **Find the process using port 8888**:
   ```bash
   netstat -ano | findstr :8888
   ```

2. **Kill the process** (replace PID with the number from above):
   ```bash
   taskkill /PID <PID> /F
   ```

3. **Start Netlify Dev**:
   ```bash
   npm run dev:netlify
   ```

4. **Access**: http://localhost:8888

---

## ✅ Option 4: Use Different Port for Netlify Dev

Edit `netlify.toml` and change the port:

```toml
[dev]
  command = "vite"
  targetPort = 8080
  port = 9999        # Changed from 8888
  publish = "dist"
  autoLaunch = false
  framework = "#custom"
```

Then run:
```bash
npm run dev:netlify
```

Access at: http://localhost:9999

---

## 🎯 Recommended Workflow

### For Development:
1. Use `npm run dev` (plain Vite) for UI work
2. Deploy to Netlify to test email functionality

### For Testing Emails:
1. Deploy to Netlify (takes 2-3 minutes)
2. Test on live site
3. Check Resend dashboard for sent emails

---

## 📧 Verifying Emails Work

After deploying to Netlify:

1. **Visit your live site**
2. **Fill out contact form**
3. **Check these places**:
   - Admin email: clarence@globalmat.co.za
   - User email: the email you entered
   - Resend dashboard: https://resend.com/emails
   - Netlify function logs: Site → Functions → send-email

---

## 🐛 Common Issues

### "Could not acquire required port"
- Another process is using the port
- Kill it or use a different port

### "MIME type error" with Netlify Dev
- Known compatibility issue with Vite + Netlify Dev
- Use Option 1 (deploy) or Option 2 (plain Vite) instead

### "404 when submitting form" (with plain Vite)
- Expected! Vite doesn't run serverless functions
- Deploy to Netlify to test email functionality

---

## ✨ Quick Deploy Script

Create a file `deploy.sh`:

```bash
#!/bin/bash
git add .
git commit -m "Update contact form"
git push
echo "✅ Pushed to GitHub. Netlify will auto-deploy in ~2 minutes"
echo "Check: https://app.netlify.com"
```

Run: `bash deploy.sh`

---

**Recommendation: Just deploy to Netlify. It's faster and more reliable than fighting with local dev server issues!** 🚀
