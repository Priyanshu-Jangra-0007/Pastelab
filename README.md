# PasteLab

**Paste. Share. Done.**

A modern, free online text and code sharing platform built with React, TypeScript, Supabase, and Tailwind CSS.

![PasteLab](https://img.shields.io/badge/PasteLab-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

- **Instant Text Sharing**: Create shareable links in seconds without signup
- **Syntax Highlighting**: Support for 20+ programming languages
- **Markdown Support**: Full markdown rendering with GitHub-flavored markdown
- **QR Code Generation**: Generate QR codes for easy mobile sharing
- **Flexible Expiration**: Choose from 10 minutes to 1 day
- **Download Options**: Export as .txt, .md, or .json files
- **Dark Theme**: Premium dark aesthetic with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **No Authentication**: No accounts, no login required
- **Auto-deletion**: Content expires automatically based on selected time

## 🛠️ Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Database**: Supabase
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **Code Highlighting**: react-syntax-highlighter
- **Markdown**: react-markdown
- **QR Codes**: qrcode.react

## 📋 Prerequisites

- Node.js 18+ or higher
- pnpm (or npm/yarn)
- A Supabase project (free tier is sufficient)

## 🔧 Setup Instructions

### 1. Clone or Download the Project

```bash
# If using git
git clone <your-repo-url>
cd pastelab
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Supabase Setup

**Good news!** This application is pre-configured with Supabase. The backend is already set up and uses Supabase Edge Functions with a Key-Value store for data persistence. No additional database configuration is needed!

The application automatically:
- Stores paste data in Supabase's KV store
- Handles expiration and cleanup
- Tracks view counts
- Manages unique share codes

### 4. Run the Development Server

```bash
pnpm run dev
# or
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 🏗️ Building for Production

```bash
pnpm run build
# or
npm run build
```

The build output will be in the `dist/` directory.

## 🚀 Deploying to Vercel

**Simplified Deployment Process:**

1. **Push your code to GitHub** (see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions)
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click **New Project** and import your repository
4. Vercel auto-detects settings - just click **Deploy**!
5. Your app is live! ✨

**No environment variables needed** - Supabase connection is automatically configured through Figma Make.

For a complete step-by-step guide including GitHub setup, custom domains, and troubleshooting, see the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 📁 Project Structure

```
pastelab/
├── src/
│   ├── app/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PasteEditor.tsx
│   │   │   └── ...
│   │   ├── config/          # Configuration files
│   │   │   └── supabase.ts  # Supabase initialization
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── ShareView.tsx
│   │   │   └── ...
│   │   ├── utils/           # Utility functions
│   │   │   └── pasteUtils.ts
│   │   ├── App.tsx          # Main app component
│   │   └── routes.ts        # Route configuration
│   └── styles/              # Global styles
├── .env.example             # Environment variables template
├── package.json
└── vite.config.ts
```

## 🔒 Security Considerations

⚠️ **Important**: PasteLab is designed for temporary, non-sensitive content sharing. 

**DO NOT share**:
- Passwords or API keys
- Private keys or tokens
- Personal identifying information (PII)
- Confidential business documents
- Sensitive or classified information

All shares are accessible to anyone with the link. Treat it like a public URL shortener.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by ShareText.io and similar text-sharing platforms
- Built with amazing open-source tools and libraries
- Icons from [Lucide](https://lucide.dev)

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for the developer community**