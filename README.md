# Kyndryl Virtual Run 🏃

AI-powered virtual running event: upload a screenshot from any running app, let AI extract your stats, and submit to a shared leaderboard backed by Google Sheets.

---

## Features

- **AI Extraction** — Upload a screenshot from Strava, Garmin, Apple Fitness, Nike Run, etc. AI reads your name, distance, pace, and time automatically.
- **Google Sheets Leaderboard** — Results are stored in a Google Sheet via Google Apps Script.
- **Ranked by Total Distance** — Each person's runs are summed; the leaderboard shows cumulative km per runner.
- **Light / Dark Mode** — Theme toggle with system preference detection.
- **Fully Responsive** — Works on desktop and mobile.

---

## Project Structure

```
kyndryl-virtual-run/
├── index.html        # Landing page
├── upload.html       # Screenshot upload + AI extraction + submission
├── leaderboard.html  # Ranked leaderboard (sum of distance per runner)
├── style.css         # Shared design system
├── theme.js          # Light/dark theme logic
├── config.js         # ⚙️ App configuration (API keys, GAS URL, AI model)
├── Code.gs           # Google Apps Script (backend)
└── README.md
```

---

## Configuration (`config.js`)

Open `config.js` and fill in your values:

```js
const APP_CONFIG = {
  OPENROUTER_API_KEY: "sk-or-v1-...",   // from openrouter.ai/keys
  GAS_URL: "https://script.google.com/macros/s/.../exec",
  DEFAULT_AI_MODEL: "openai/gpt-4o-mini",
};
```

> **Note:** Values set via the in-page "API Config" panel (stored in `localStorage`) take priority over `config.js`, so users can override without editing files.

---

## Google Apps Script Setup

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Open **Extensions → Apps Script** .
3. Replace the default code with the contents of `Code.gs`.
4. Click **Deploy → New deployment**.
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the **Web App URL** (e.g. `https://script.google.com/macros/s/AKfyc.../exec`).
6. Paste this URL into `config.js` as `GAS_URL`.

---

## Deploy to Vercel

Vercel serves static files directly — no build step needed.

### Prerequisites

- A free [Vercel account](https://vercel.com/signup)
- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) installed (for the Vercel CLI)

---

### Option A — Deploy via Vercel Dashboard (Recommended)

1. **Push your project to GitHub**

   ```bash
   cd /path/to/kyndryl_VirtualRun
   git init
   git add .
   git commit -m "Initial commit"
   ```

   Create a new repo on [github.com/new](https://github.com/new), then:

   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Import project on Vercel**

   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"** and select your repo
   - Framework Preset: **Other** (leave blank — it's a static site)
   - Root Directory: `/` (default)
   - Click **Deploy**

3. **Done!** Vercel assigns a URL like `https://kyndryl-virtual-run.vercel.app`.

---

### Option B — Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Log in**

   ```bash
   vercel login
   ```

3. **Deploy from project directory**

   ```bash
   cd /path/to/kyndryl_VirtualRun
   vercel
   ```

   When prompted:
   - **Set up and deploy**: `Y`
   - **Project name**: press Enter (or set a custom name)
   - **Root directory**: `./` (press Enter)
   - **Override settings**: `N`

4. **Deploy to production**

   ```bash
   vercel --prod
   ```

   The command prints your production URL.

---

### Custom Domain (Optional)

1. In the Vercel dashboard, open your project → **Settings → Domains**.
2. Click **Add** and enter your domain.
3. Follow Vercel's DNS instructions (add a CNAME or A record at your registrar).

---

### Re-deployment

Every `git push` to your main branch automatically triggers a new deployment if you linked a Git repo. If using the CLI, run `vercel --prod` again after changes.

---

## Local Development

No build tools required — open any HTML file directly in your browser, or use a simple local server:

```bash
npx serve .
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML / CSS / JS |
| AI Vision | [OpenRouter](https://openrouter.ai) API |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Hosting | Vercel (static) |

---

## License

MIT
