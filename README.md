# RunTrack — Virtual Running Event Tracker
## Setup Guide

---

## What You Get

| File | Description |
|------|-------------|
| `index.html` | Landing page with event info |
| `upload.html` | Runner photo upload + AI extraction |
| `leaderboard.html` | Live rankings by longest distance |
| `style.css` | Shared stylesheet (must be in same folder) |
| `Code.gs` | Google Apps Script (backend + database) |

---

## Step 1 — Set Up Google Sheets (Database)

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new spreadsheet**
2. Name it something like `RunTrack Event`
3. Open **Extensions → Apps Script**
4. Delete all existing code in the editor
5. Copy and paste the entire contents of `Code.gs`
6. Click **Save** (Ctrl+S / Cmd+S)

---

## Step 2 — Deploy the Apps Script as a Web App

1. In Apps Script, click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Type" and select **Web app**
3. Set the following:
   - **Description:** RunTrack API
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize the app when prompted (click "Allow")
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
7. Save this URL — you'll need it in the next steps

> ⚠️ If you update `Code.gs` later, you must create a **new deployment** each time.

---

## Step 3 — Get Your OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai) and sign up / log in
2. Navigate to **Keys** → **Create Key**
3. Copy your API key (starts with `sk-or-v1-...`)
4. Fund your account with a small amount (GPT-4o Mini costs ~$0.0003/image)

**Recommended Models (best to cheapest):**
- `openai/gpt-4o-mini` — Best accuracy, very cheap (~$0.0003/call)
- `google/gemini-2.0-flash-001` — Fast and accurate
- `openai/gpt-4o` — Most accurate, higher cost

---

## Step 4 — Deploy the Frontend

### Option A: Local (Just Open Files)
Simply open `index.html` in your browser. All pages link to each other via relative paths.

### Option B: GitHub Pages (Free Hosting)
1. Create a GitHub repo and upload all 5 files
2. Go to **Settings → Pages**
3. Source: Deploy from branch → `main` → `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Option C: Netlify (Free + Custom Domain)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder onto the Netlify dashboard
3. Done — instant deployment with a free URL

---

## Step 5 — Configure the App

When you first open the app:

1. Go to `upload.html`
2. Click **⚙️ API Configuration**
3. Enter your **OpenRouter API key**
4. Select your preferred **AI model**
5. Paste your **Google Apps Script URL**
6. Click **Save Config**

These are stored in your browser's localStorage.

On `leaderboard.html`, you'll also be prompted to enter the Apps Script URL the first time.

---

## How It Works

```
User uploads running screenshot
        ↓
OpenRouter Vision AI reads the image
        ↓
Extracts: name, date, finish_time, distance, pace, time
        ↓
User reviews & edits extracted data
        ↓
Clicks "Submit to Leaderboard"
        ↓
Data sent to Google Apps Script via GET request
        ↓
Apps Script appends row to Google Sheet
        ↓
Leaderboard page fetches from Apps Script
        ↓
Rankings displayed sorted by longest distance
```

---

## Google Sheet Column Structure

The `Runners` sheet is auto-created with these columns:

| Column | Type | Example |
|--------|------|---------|
| name | Text | John Smith |
| finish_date | Date | 2024-03-15 |
| finish_time | Time | 07:30:00 |
| distance | Number (km) | 21.1 |
| pace | Text | 5:32 |
| time | Text | 01:57:44 |
| submitted_at | ISO timestamp | 2024-03-15T08:00:00Z |

---

## Customizing the Event

### Change Event Name
Search and replace `RunTrack` in all HTML files with your event name.

### Change Distance Categories
In `index.html`, find the `.distances-grid` section and edit the distance cards.

### Add/Remove Fields
1. Add the field to `HEADERS` array in `Code.gs`
2. Update `handleSubmit()` to capture the new field
3. Add the field to the form in `upload.html`
4. Update the table in `leaderboard.html`

---

## Troubleshooting

**AI extraction returns empty fields**
- Make sure your screenshot clearly shows all stats
- Try a different AI model (GPT-4o is most accurate)
- Check that your OpenRouter API key has credit

**Leaderboard shows no data**
- Verify your Apps Script URL is correct
- Make sure the Web App is deployed with "Anyone" access
- Check the browser console for CORS errors
- Try redeploying the Apps Script as a new deployment

**Data not appearing in Google Sheets**
- Confirm the deployment is "Execute as: Me" and "Who has access: Anyone"
- Check the Apps Script execution logs: View → Executions

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| Google Sheets | Free |
| Google Apps Script | Free (up to 6 min/execution, 100 deployments/day) |
| Frontend Hosting (Netlify/GitHub Pages) | Free |
| OpenRouter GPT-4o Mini | ~$0.0003 per photo upload |
| **100 submissions** | **~$0.03 total** |

---

## Tech Stack

- **Frontend:** Plain HTML5 + CSS3 + Vanilla JavaScript
- **AI Vision:** OpenRouter API (GPT-4o Mini / Gemini / Claude)
- **Database:** Google Sheets
- **Backend:** Google Apps Script (serverless)
- **Hosting:** Any static file host

No Node.js, no build tools, no dependencies. Just open and go.
# kyndryl-virtual-running
