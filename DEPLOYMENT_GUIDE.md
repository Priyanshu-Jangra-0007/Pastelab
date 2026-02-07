# PasteLab - Deployment Guide

This guide will walk you through deploying PasteLab to Vercel with Supabase backend integration and connecting it to GitHub.

## Prerequisites

- A GitHub account
- A Vercel account (can sign up with GitHub)
- A Supabase account (free tier works perfectly)
- Git installed on your computer

## Step 1: Set Up GitHub Repository

### 1.1 Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top-right corner → "New repository"
3. Name your repository (e.g., `pastelab`)
4. Choose "Public" or "Private"
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 1.2 Push Your Code to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: PasteLab application with Supabase"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/pastelab.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Set Up Supabase (Backend)

### 2.1 Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization (or create one)
4. Fill in project details:
   - **Name**: PasteLab (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient
5. Click "Create new project" (takes 1-2 minutes)

### 2.2 Get Your Supabase Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll need these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`

**Keep these safe - you'll need them for Vercel!**

### 2.3 Verify Edge Functions

Your Supabase project automatically includes the Edge Functions needed for PasteLab (they're part of your codebase in `/supabase/functions/server/`). These will be deployed automatically.

## Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (use "Continue with GitHub")
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - If not visible, click "Adjust GitHub App Permissions"
   - Grant access to your pastelab repository
   - Click "Import" next to your repository

### 3.2 Configure Build Settings

Vercel should auto-detect your settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `pnpm run build` (or `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `pnpm install` (or `npm install`)

### 3.3 Add Environment Variables

Before deploying, click "Environment Variables" and add:

**Nothing to add!** 

The Supabase connection is handled automatically through Figma Make's integration. Your application is already connected to Supabase.

### 3.4 Deploy

1. Click "Deploy"
2. Wait 1-2 minutes for the build to complete
3. You'll see a success page with your live URL!

## Step 4: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://pastelab.vercel.app`)
2. Try creating a new paste:
   - Enter some text
   - Select an expiration time
   - Click "Create Share Link"
3. Verify you can:
   - Copy the share link
   - View the shared content
   - See view counts incrementing
   - Download as different formats

## Step 5: Set Up Custom Domain (Optional)

### 5.1 Add Custom Domain in Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Enter your domain name (e.g., `pastelab.com`)
4. Click "Add"

### 5.2 Configure DNS

Vercel will show you DNS records to add. In your domain registrar:

**For root domain (pastelab.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

DNS propagation can take up to 48 hours, but usually completes within minutes.

## Step 6: Set Up Automatic Deployments

### 6.1 Configure GitHub Integration

Vercel automatically sets up continuous deployment:

- **Production**: Pushes to `main` branch deploy to production
- **Preview**: Pull requests create preview deployments
- **Development**: Pushes to other branches create development previews

### 6.2 Test Automatic Deployment

1. Make a small change to your code locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```
3. Go to Vercel dashboard - you'll see a new deployment starting!

## Managing Your Application

### View Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click on any deployment
3. View "Build Logs" for build information
4. View "Function Logs" for Edge Function logs

### Monitor Supabase Usage

1. Go to Supabase Dashboard → Your Project
2. Check "Database" for KV store usage
3. Monitor "Edge Functions" for API call statistics
4. Free tier includes:
   - 500MB database space
   - 2GB bandwidth
   - 500,000 Edge Function invocations

### Update Your Application

Simply push changes to GitHub:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel automatically builds and deploys!

## Troubleshooting

### Build Fails on Vercel

**Check build logs:**
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility
- Check for TypeScript errors

**Solution:**
```bash
# Test build locally
pnpm install
pnpm run build
```

### "Failed to fetch" Errors

**Check Supabase connection:**
- Verify your project is connected in Figma Make
- Check Edge Function logs in Supabase Dashboard
- Ensure KV store is accessible

### Paste Not Saving/Loading

**Check server logs:**
1. Go to Supabase Dashboard
2. Click "Edge Functions"
3. View function logs for errors
4. Common issues:
   - KV store permissions
   - Malformed requests
   - Network timeouts

### Deployment Success but Site Not Working

**Clear browser cache:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser console for errors (F12)

**Check Vercel deployment:**
- Ensure deployment status is "Ready"
- Click deployment URL to test
- Check Function logs for backend errors

## Performance Optimization

### Enable Vercel Analytics (Optional)

1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Enable Web Analytics
4. View real user metrics and performance data

### Configure Caching

Add to your project (create `vercel.json` in root if performance needed):

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Security Best Practices

1. **Never commit sensitive keys** to GitHub
2. **Use environment variables** for all secrets
3. **Enable Vercel's password protection** for preview deployments (Settings → General)
4. **Monitor Supabase usage** to prevent abuse
5. **Set up rate limiting** if experiencing spam

## Scaling Considerations

### Free Tier Limits

**Vercel:**
- 100GB bandwidth/month
- 100 hours of Edge Function execution
- Unlimited static deployments

**Supabase:**
- 500MB database
- 2GB bandwidth
- 500K Edge Function requests

### When to Upgrade

Consider upgrading if you exceed:
- 1000+ shares/day
- 100K+ views/month
- Consistent rate limiting

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **GitHub Actions**: https://github.com/features/actions
- **Figma Make Support**: Check Figma Make documentation

## Next Steps

After successful deployment:

1. ✅ Share your PasteLab URL with users
2. ✅ Monitor usage in Vercel and Supabase dashboards
3. ✅ Set up custom domain (if desired)
4. ✅ Enable analytics for user insights
5. ✅ Consider adding more features:
   - User accounts
   - Private pastes
   - Custom expiration times
   - Syntax highlighting for more languages
   - API access for developers

---

**Congratulations! Your PasteLab application is now live! 🎉**

For questions or issues, check the troubleshooting section or create an issue in your GitHub repository.
