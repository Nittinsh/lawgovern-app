# LawGovern Compliance Intelligence
## Complete Setup, Deployment & Monetization Guide

---

## HOW IT WORKS AFTER DEPLOYMENT

```
Your Client                Your Server (Vercel)           Groq AI
─────────                  ────────────────────           ───────
Opens URL  ──────────────► Serves index.html
Enters code ─────────────► Validates code (secret list)
Asks question ───────────► Forwards to Groq AI  ────────► AI answers
              ◄─────────── Returns answer        ◄────────
Sees answer
```

✅ Your Groq API key = HIDDEN on server (users never see it)
✅ You control who gets access via access codes
✅ Users just open a URL — no technical knowledge needed

---

## STEP 1: Get Your Free Groq API Key (2 minutes)

1. Go to: https://console.groq.com/keys
2. Sign up with Gmail (free, no credit card)
3. Click "Create API Key"
4. Copy the key — it starts with `gsk_`
5. Save it safely — you'll need it in Step 3

---

## STEP 2: Upload to GitHub (5 minutes)

1. Go to: https://github.com and sign up free
2. Click "New Repository"
3. Name it: `lawgovern-app`
4. Set to **Private** (important!)
5. Click "Create Repository"
6. Click "uploading an existing file"
7. Upload these files:
   - `index.html`
   - `vercel.json`
   - `api/ask.js`
8. Click "Commit changes"

---

## STEP 3: Deploy to Vercel (5 minutes)

1. Go to: https://vercel.com and sign up with GitHub
2. Click "Add New Project"
3. Select your `lawgovern-app` repository
4. Click "Deploy" (Vercel auto-detects the settings)
5. Wait ~1 minute for deployment

### Set Environment Variables (CRITICAL — do this before sharing):

In Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable Name  | Value                        |
|----------------|------------------------------|
| GROQ_API_KEY   | gsk_your_actual_key_here     |
| ACCESS_CODES   | CODE1,CODE2,CODE3,CODE4      |

**Example ACCESS_CODES value:**
```
AMIT2026,PRIYA_MAR,SHARMA01,GUPTA99,MEHTA22
```
Each comma-separated code = one paying client.

6. After adding env variables → Click "Redeploy"

### Your app is now live at:
```
https://lawgovern-app.vercel.app
```
(or your custom domain)

---

## STEP 4: Give Clients Access Codes

When someone pays you:
1. Give them the URL: `https://lawgovern-app.vercel.app`
2. Give them their unique access code e.g. `AMIT2026`
3. They open the URL, enter the code, and use the tool

To **revoke** access: Remove their code from ACCESS_CODES in Vercel env vars → Redeploy.
To **add** new client: Add their code to ACCESS_CODES → Redeploy.

---

## STEP 5: Add Your Custom Domain (Optional — Rs.700/year)

1. Buy domain: `lawgovern.in` or `lawgoverncompliance.com` from GoDaddy/Namecheap
2. In Vercel → Your Project → Settings → Domains → Add domain
3. Follow DNS instructions
4. Your app runs at: `https://lawgovern.in`

---

## MONETIZATION MODELS

### Option A: Monthly Subscription (Recommended)
- Price: Rs.999 – Rs.2,999 per user per month
- Give each user a unique code
- Renew codes monthly (change old codes in env vars)
- Target: CA firms, CS firms, corporate legal teams

### Option B: Per-Company Compliance Package
- Price: Rs.4,999 – Rs.9,999 per company per year
- One code per company
- Includes: checklist, calendar, AI queries

### Option C: Bulk Licensing
- Price: Rs.24,999 – Rs.49,999 per firm per year
- 10 codes per firm
- Target: CA firms with multiple clients

### Option D: WhatsApp/Telegram Bot (future upgrade)
- Charge Rs.199–499/month per user

---

## COSTS TO YOU

| Item            | Cost         |
|-----------------|--------------|
| Vercel hosting  | FREE forever |
| Groq AI         | FREE (14,400 queries/day) |
| GitHub          | FREE         |
| Domain (optional)| ~Rs.700/year |
| **Total**       | **Rs.0 – Rs.700/year** |

---

## MANAGING ACCESS CODES

Create codes in any format you want. Suggestions:
- Client-specific: `SHARMA_2026`, `MEHTA_FEB`
- Monthly rotation: `MAR2026_A1`, `MAR2026_B2`
- Company-specific: `TATA_CORP`, `INFOSYS01`

**To update codes in Vercel:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Edit `ACCESS_CODES`
3. Click "Save"
4. Go to Deployments → Click "..." → Redeploy

---

## TROUBLESHOOTING

**"Invalid access code" even with correct code:**
→ Check no spaces in ACCESS_CODES env var
→ Redeploy after changing env vars

**AI not answering:**
→ Check GROQ_API_KEY is correct in Vercel env vars
→ Visit console.groq.com to verify key is active

**App shows blank page:**
→ Check Vercel deployment logs for errors
→ Ensure all 3 files are uploaded correctly

---

## FILES IN THIS PACKAGE

```
lawgovern-app/
├── index.html      ← The app (frontend)
├── vercel.json     ← Vercel configuration
├── api/
│   └── ask.js      ← Server that holds your API key
└── SETUP_GUIDE.md  ← This file
```

---

## SUPPORT

For any issues with setup, contact your developer.
For Groq API issues: console.groq.com
For Vercel issues: vercel.com/docs
