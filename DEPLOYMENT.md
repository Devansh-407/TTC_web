# Deployment Guide for TTC Websites

## 🚀 Deploy Both Sites on Netlify (Free)

### Step 1: Prepare for Deployment
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

### Step 2: Deploy Main Site
1. Navigate to project directory:
```bash
cd d:\TTC-web\TTC
```

2. Build the site:
```bash
npm run build:netlify
```

3. Deploy to Netlify:
```bash
netlify deploy --prod --dir=out
```

4. Your main site will be live at: `https://your-site-name.netlify.app`

### Step 3: Deploy Admin Dashboard
1. Create admin-specific build:
```bash
npm run build:netlify
```

2. Deploy admin to separate Netlify site:
```bash
netlify deploy --prod --dir=out --site=your-admin-site-name
```

3. Your admin site will be live at: `https://your-admin-site.netlify.app`

## 🔧 Alternative Deployment Options

### Option 1: Railway (Recommended for APIs)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub account
3. Import repository: `Devansh-407/TTC_web`
4. Railway will auto-detect Next.js and deploy
5. Set environment variables if needed

### Option 2: DigitalOcean App Platform
1. Create DigitalOcean account
2. Go to App Platform
3. Connect GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Node Version: 18

### Option 3: AWS Amplify
1. Go to AWS Amplify Console
2. Connect GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Base Directory: `TTC/`
   - Publish Directory: `.next`

## 📋 Important Notes

### CORS Configuration
- All API routes have CORS headers configured
- Admin dashboard can access main site APIs
- Fallback to local JSON files included

### Environment Variables
If needed, set these in your deployment platform:
- `NODE_VERSION=18`
- `NEXT_PUBLIC_API_URL=https://your-main-site.com`

### Custom Domain
After deployment, you can add custom domains:
1. Go to your deployment platform settings
2. Add domain name
3. Update DNS records

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build:netlify

# Deploy to Netlify
netlify deploy --prod --dir=out

# Deploy admin separately
netlify deploy --prod --dir=out --site=admin-site
```

## 📞 Support

If you need help:
1. Check build logs for errors
2. Ensure all dependencies are installed
3. Verify API routes are working
4. Check CORS configuration

Both sites will be fully functional with:
- ✅ Product management
- ✅ Category management  
- ✅ Occasion management
- ✅ About page editing
- ✅ CORS-free API access
