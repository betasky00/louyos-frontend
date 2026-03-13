# Louyos Academy & Consulting - Frontend Only

A clean, production-ready marketing website for Louyos Academy & Consulting built with **Vite + React + TypeScript + Tailwind CSS**.

## 🚀 Features

- **Frontend Only**: Zero backend dependencies, pure React SPA
- **Multilingual**: Full support for English, Spanish, and French with language toggle
- **Responsive Design**: Mobile-first design that works on all devices
- **Simple Forms**: Session request, consulting request, and contact forms with localStorage
- **SEO Ready**: Proper meta tags and structure
- **Vercel Deployable**: One-click deployment to Vercel

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open `http://localhost:5173`

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

**Option 1: Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option 2: GitHub Integration (Recommended)**
1. Push to GitHub
2. Go to vercel.com and select your repo
3. Vercel auto-detects Vite configuration
4. Click Deploy

The `vercel.json` file is pre-configured with:
- Build Command: `npm run build`
- Output Directory: `dist`

## 📝 Content Management

### Update Translations
Edit `src/i18n/translations.ts` for EN/ES/FR content.

### Update Contact Info
Phone: +34 626 351 439
Email: louyos@gmail.com

## 💾 Form Submissions

Forms store data in browser localStorage. For production, integrate SendGrid/Mailgun.

## 🎨 Customization

Edit `tailwind.config.js` for colors.

## 📱 Browser Support

Chrome, Firefox, Safari, Edge (latest) + mobile browsers

---

**Built with Vite + React + TypeScript + Tailwind CSS**
