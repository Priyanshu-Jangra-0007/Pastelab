# PasteLab - Quick Start Guide

Get PasteLab deployed to Vercel in under 5 minutes! 🚀

## Prerequisites

- GitHub account
- Vercel account (sign up with GitHub for free)

## Step 1: Push to GitHub (2 minutes)

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: PasteLab"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/pastelab.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click "Continue with GitHub"
3. Click "Add New..." → "Project"
4. Find and import your `pastelab` repository
5. Click "Deploy" (Vercel auto-detects all settings)
6. Wait ~60 seconds
7. Done! Your app is live! 🎉

## Step 3: Test Your App

Visit your Vercel URL (e.g., `https://pastelab-xyz.vercel.app`):

1. Paste some text
2. Click "Create Share Link"
3. Copy and share the link
4. View counts should increment automatically

## That's It!

Your PasteLab is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase backend
- ✅ Auto-deploying on every push to main
- ✅ Serving users worldwide

## Next Steps (Optional)

- **Custom Domain**: Add your domain in Vercel Settings → Domains
- **Monitor Usage**: Check Vercel Analytics and Supabase Dashboard
- **Customize**: Edit the code and push - auto-deploys!

## Need Help?

- Full deployment guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- README: [README.md](./README.md)
- Troubleshooting: See DEPLOYMENT_GUIDE.md

---

**Happy sharing! 📝✨**
