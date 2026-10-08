# 🌟 Lucky Star Jar — How to Run & Deploy

---

## 🚀 STEP 1 — Install Node.js (one-time only)

Download and install **Node.js** from: https://nodejs.org  
Pick the version marked **"LTS"** (recommended for most users). Install it like any normal program.

---

## 💻 STEP 2 — Run on Your Computer

### On Windows:
1. Unzip this folder somewhere on your computer
2. Double-click **`START-WINDOWS.bat`**
3. Wait ~30 seconds for it to set up
4. Open your browser and go to **http://localhost:5000**

### On Mac:
1. Unzip this folder
2. Open Terminal, drag the folder into it, press Enter
3. Type: `chmod +x START-MAC.sh && ./START-MAC.sh`
4. It will open the browser automatically

### Manual (any computer):
Open a terminal/command prompt in this folder and run:
```
npm install
npm run dev
```
Then open: **http://localhost:5000**

---

## 🌐 STEP 3 — Deploy Online (Free, so anyone can open it via a link)

### Option A — Vercel (Easiest, Recommended)

1. Go to **https://vercel.com** → Sign up for free
2. Click **"Add New Project"**
3. Click **"Upload"** and drag your project folder in
4. Click **Deploy** — you'll get a live link like `https://lucky-star-jar.vercel.app` 🎉

### Option B — Vercel via Command Line

```bash
npm install -g vercel
vercel
```
Follow the prompts — it takes about 1 minute. Vercel gives you a free `.vercel.app` link.

### Option C — GitHub + Vercel (Auto-updates)

1. Push this folder to GitHub
2. Go to https://vercel.com/new → Import your repo
3. Click Deploy — every time you push changes, it auto-redeploys

---

## ✏️ Customizing

| What to change | Where |
|---|---|
| Messages in the stars | `client/src/components/StarJarExperience.tsx` → `messages` array |
| Background photos | Replace files in `client/public/` (keep same filenames: photo1.jpeg, photo2.jpeg...) |
| Title text | `StarJarExperience.tsx` → find "Lucky Star Jar" |

---

Made with 💛 — a digital lucky star jar, just for you.
