# Deployment Guide - Louyos Frontend

## Quick Start

This is a **frontend-only** Vite + React application with zero backend dependencies.

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account (for Vercel integration)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## Build for Production

```bash
npm run build
```

Output: `dist/` folder (ready for deployment)

## Deploy to Vercel

### Method 1: Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel will auto-detect Vite configuration.

### Method 2: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Done!** Your site is live at `your-project.vercel.app`

## Vercel Configuration

The `vercel.json` file is pre-configured with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- Correct build command
- Correct output directory
- Client-side routing works properly

## Custom Domain

After deployment:
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## Environment Variables

This project has **NO environment variables required**.

All content is hardcoded in `src/i18n/translations.ts`.

## Form Submissions

Forms currently store data in browser localStorage.

**For production**, integrate with an email service:

### Option 1: SendGrid
1. Sign up at https://sendgrid.com
2. Get API key
3. Update form handlers in `src/pages/*.tsx`

### Option 2: Mailgun
1. Sign up at https://mailgun.com
2. Get API key
3. Update form handlers in `src/pages/*.tsx`

### Option 3: Formspree
1. Go to https://formspree.io
2. Create new form
3. Update form action in components

## Troubleshooting

### Build fails locally
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Vercel build fails
- Check Node.js version: `node --version` (should be 18+)
- Clear Vercel cache in project settings
- Redeploy

## Performance Tips

- Bundle size: ~150KB gzipped (React + Router + Tailwind)
- All pages are static (no backend calls)
- Fast first load with Vite
- Optimized for Vercel edge network

## Support

- Louyos Phone: +34 626 351 439
- Louyos Email: louyos@gmail.com

---

**Deployed with ❤️ on Vercel**
