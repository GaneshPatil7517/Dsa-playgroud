# 🌐 Custom Domain Setup Guide for GitHub Pages

## Overview
You can serve your DSA Playground from a custom domain instead of `ganeshpatil7517.github.io/DSA-Playground/`

## 📝 Prerequisites

1. **Own a Domain Name**: Purchase from registrars like:
   - [Namecheap](https://www.namecheap.com/) - $8-12/year
   - [GoDaddy](https://www.godaddy.com/) - $10-15/year
   - [Google Domains](https://domains.google/) - $12/year
   - [Cloudflare](https://www.cloudflare.com/products/registrar/) - At cost pricing

2. **Access to DNS Settings**: You need to modify DNS records at your domain registrar

## 🚀 Setup Steps

### Step 1: Choose Your Domain Type

You have two options:

#### Option A: Apex Domain (Recommended for main site)
- Example: `dsaplayground.com`
- Example: `ganeshpatil.dev`
- Shorter, cleaner URLs

#### Option B: Subdomain (Recommended for projects)
- Example: `dsa.ganeshpatil.com`
- Example: `www.dsaplayground.com`
- Good for organizing multiple projects

### Step 2: Configure DNS Records

Log in to your domain registrar's dashboard and add DNS records:

#### For Apex Domain (example.com):

Add **4 A records** pointing to GitHub's servers:

```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

**Also add www subdomain (optional but recommended):**
```
Type: CNAME
Name: www
Value: ganeshpatil7517.github.io
TTL: 3600
```

#### For Subdomain Only (dsa.example.com):

Add **1 CNAME record**:

```
Type: CNAME
Name: dsa (or www, or any subdomain)
Value: ganeshpatil7517.github.io
TTL: 3600
```

### Step 3: Update CNAME File in Repository

1. **Edit the CNAME file** at `frontend/public/CNAME`
2. **Add your domain** (one line, no http://, no trailing slash):

For apex domain:
```
dsaplayground.com
```

For subdomain:
```
dsa.ganeshpatil.com
```

3. **Save and commit**:
```powershell
cd "c:\Users\HP\Music\DSA Mini Project"
git add frontend/public/CNAME
git commit -m "Add custom domain"
git push origin main
```

### Step 4: Configure GitHub Repository

1. Go to: https://github.com/GaneshPatil7517/DSA-Playground/settings/pages
2. Under **"Custom domain"**, enter your domain:
   - Example: `dsaplayground.com`
   - Or: `dsa.ganeshpatil.com`
3. Click **Save**
4. Wait for DNS check to complete (green checkmark)
5. **Enable "Enforce HTTPS"** (wait 24 hours if option is grayed out)

### Step 5: Update Vite Configuration

Update `frontend/vite.config.js` to remove the base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/DSA-Playground/'
})
```

Commit and push:
```powershell
git add frontend/vite.config.js
git commit -m "Update base path for custom domain"
git push origin main
```

## ⏱️ DNS Propagation

- DNS changes can take **24-48 hours** to propagate worldwide
- Usually works within **1-2 hours**
- Check propagation: https://www.whatsmydns.net/

## ✅ Verify Setup

### Check DNS Records:
```powershell
# For apex domain:
nslookup dsaplayground.com

# For subdomain:
nslookup dsa.ganeshpatil.com
```

### Expected Results:
- Apex domain should show GitHub's IP addresses
- Subdomain should show CNAME to ganeshpatil7517.github.io

### Test Your Site:
1. Visit your custom domain
2. All pages should load correctly
3. HTTPS should work (green lock icon)

## 🔒 HTTPS/SSL Certificate

GitHub automatically provides **free SSL certificate** via Let's Encrypt:
- Issued within 24 hours of setup
- Auto-renews every 90 days
- Enable "Enforce HTTPS" in GitHub Pages settings

## 📋 Popular Domain Name Ideas

For DSA Playground:
- `dsaplayground.com`
- `visualdsa.com`
- `dsalearning.com`
- `algovisualizer.com`
- `yourname-dsa.com`

For Developer Portfolio:
- `yourname.dev`
- `yourname.tech`
- `yourname.codes`
- `yourname.io`

## 🐛 Troubleshooting

### Issue: "Domain is improperly configured"
- **Solution**: Double-check DNS records, wait for propagation

### Issue: "DNS check failed"
- **Solution**: Ensure A/CNAME records are correct, no typos
- Remove any conflicting DNS records

### Issue: HTTPS not available
- **Solution**: Wait 24 hours after adding domain
- DNS must be fully propagated first

### Issue: 404 errors on custom domain
- **Solution**: Ensure CNAME file exists in `frontend/public/`
- Verify `base: '/'` in vite.config.js

### Issue: Old URLs still showing
- **Solution**: Clear browser cache, use incognito mode

## 💰 Free Domain Options

If you're a student or don't want to pay:

### 1. GitHub Student Developer Pack
- Free `.me` domain for 1 year via Namecheap
- Apply: https://education.github.com/pack

### 2. Freenom (Free Domains)
- Free `.tk`, `.ml`, `.ga`, `.cf`, `.gq` domains
- Not recommended for professional use
- Website: https://www.freenom.com/

### 3. Use GitHub Subdomain
- Completely free: `ganeshpatil7517.github.io/DSA-Playground/`
- No setup required

## 📚 Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Records Explained](https://www.cloudflare.com/learning/dns/dns-records/)
- [Check DNS Propagation](https://www.whatsmydns.net/)

## 🎯 Quick Start (Once You Have a Domain)

```powershell
# 1. Configure DNS at your registrar (see Step 2)

# 2. Add domain to CNAME file
echo "yourdomain.com" > "frontend/public/CNAME"

# 3. Update Vite config
# Change base to '/' in frontend/vite.config.js

# 4. Commit and push
cd "c:\Users\HP\Music\DSA Mini Project"
git add .
git commit -m "Configure custom domain"
git push origin main

# 5. Add domain in GitHub Settings → Pages
# 6. Wait for DNS propagation (1-24 hours)
# 7. Enable HTTPS after DNS check passes
```

---

**Note**: If you don't have a domain yet, your site works perfectly at:
**https://ganeshpatil7517.github.io/DSA-Playground/**

Custom domains are optional and only needed if you want a personalized URL!