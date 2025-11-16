# Windows Permission Error Fix

## 🔴 Problem
Netlify CLI failed to install globally due to Windows permission errors (EPERM).

## ✅ Solutions (Choose One)

### Option 1: Install Locally (Easiest - RECOMMENDED)

I've already started installing `netlify-cli` as a dev dependency. Once it finishes:

```bash
npm run dev
```

This will use the local version via `npx netlify dev`.

**Wait for the installation to complete**, then run the command above.

---

### Option 2: Run as Administrator

1. **Close your current terminal**
2. **Right-click** on Windows Terminal or Command Prompt
3. Select **"Run as Administrator"**
4. Navigate to your project:
   ```bash
   cd c:\Users\ThaboMponya\Documents\DEV\globall_mat\carpet-creations-hub
   ```
5. Install globally:
   ```bash
   npm install -g netlify-cli
   ```
6. Run:
   ```bash
   npm run dev
   ```

---

### Option 3: Use Yarn (Alternative)

Since you already have Yarn:

```bash
yarn global add netlify-cli
```

Then:
```bash
npm run dev
```

---

### Option 4: Test Without Netlify Dev (Quick Test Only)

For a quick test, you can deploy to Netlify and test there:

1. Push your code to GitHub
2. Connect to Netlify
3. Add `RESEND_API_KEY` environment variable
4. Deploy
5. Test the contact form on the live site

---

## 🎯 Recommended Approach

**Wait for the local installation to finish** (it's running now), then:

```bash
npm run dev
```

This should work without any permission issues since it's installed locally in your project.

---

## ⏱️ Check Installation Status

Run this to see if netlify-cli is installed:

```bash
npx netlify --version
```

If it shows a version number, you're good to go!

---

## 🧪 Once Running

1. Access: **http://localhost:8888**
2. Test the contact form
3. Check for emails

---

## 🐛 Still Having Issues?

If local installation also fails, you have two options:

### A. Deploy to Netlify (Production Test)
The easiest way to test the email functionality is to deploy:
1. Push to GitHub
2. Deploy on Netlify
3. Add environment variable
4. Test on live site

### B. Manual Function Testing
Create a test script to call the function directly (I can help with this if needed).

---

**The local installation should complete shortly. Just run `npm run dev` when it's done!**
