# Panduan Deployment ke Vercel 🚀

Smart Inclusive Puzzle dapat di-deploy ke Vercel dengan mudah dalam beberapa menit!

## Quick Start (Tercepat)

### Opsi 1: Connected dari GitHub (Recommended)

**Step 1: Setup Git & GitHub**

```bash
# Inisialisasi git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: Smart Inclusive Puzzle v1.0"

# Add remote (ganti YOUR_USERNAME dan REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Step 2: Connect ke Vercel**

1. Buka https://vercel.com
2. Login dengan GitHub account (atau buat baru)
3. Click "Import Project"
4. Pilih "Import from Git"
5. Paste repository URL:
   ```
   https://github.com/YOUR_USERNAME/REPO_NAME
   ```
6. Click "Continue"
7. Konfigurasi:
   - **Project Name**: smart-inclusive-puzzle
   - **Framework**: "Other" atau "Static Site"
   - **Build Command**: (kosongkan atau `echo 'Static site'`)
   - **Output Directory**: (kosongkan)
   - **Environment Variables**: (tidak perlu)
8. Click "Deploy"

**Selesai!** ✅ Aplikasi Anda sudah live!

**Link hasil deploy:** `https://smart-inclusive-puzzle.vercel.app`

---

### Opsi 2: Vercel CLI (Untuk Developer)

**Install Vercel CLI**
```bash
npm install -g vercel
```

**Login**
```bash
vercel login
```

**Deploy**
```bash
vercel
```

**Atau deploy production langsung**
```bash
vercel --prod
```

---

### Opsi 3: Drag & Drop (Paling Mudah)

1. Buka https://vercel.com/new/import
2. Biarkan field repository URL kosong
3. Scroll ke bawah, click "Or, import a Git repository later"
4. Drag & drop folder project ke area yang ditunjukkan
5. Klik "Deploy"

---

## Configuration Terperinci

### vercel.json Explanation

File `vercel.json` yang sudah ada mengatur:

```json
{
  "buildCommand": "echo 'Static site - no build needed'",
  // ↑ Tidak perlu build step karena pure static HTML/CSS/JS

  "devCommand": "python3 -m http.server 3000",
  // ↑ Command untuk development lokal

  "cleanUrls": true,
  // ↑ URL tanpa .html (.../index → ...)

  "headers": [
    {
      "source": "(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
          // ↑ Cache 1 jam untuk performa
        }
      ]
    }
  ],

  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
      // ↑ Redirect semua ke index.html (untuk SPA behavior)
    }
  ]
}
```

### Environment Variables

Untuk setup API keys atau config sensitif:

1. Di Vercel dashboard → Settings → Environment Variables
2. Tambahkan variable yang diperlukan
3. Re-deploy untuk apply

Contoh:
```
PUZZLE_API_URL = https://api.example.com
API_KEY = your-key-here
```

---

## Testing Before Deploy

### Local Testing

```bash
# Start server lokal
npm run dev
# atau
python3 -m http.server 8000

# Test di browser
# http://localhost:8000
```

**Checklist sebelum deploy:**
- ✅ Buka index.html
- ✅ Test puzzle flow
- ✅ Test voice recognition
- ✅ Test smua button
- ✅ Check responsiveness (F12 → Toggle device toolbar)
- ✅ Test di mobile browser jika ada device

### Device Testing

**Windows:**
- Chrome ✅
- Edge ✅
- Firefox ✅

**macOS:**
- Safari ✅
- Chrome ✅
- Firefox ✅

**iOS:**
- Safari (14.5+) ✅
- Chrome ✅

**Android:**
- Chrome ✅
- Firefox ✅
- Samsung Internet ✅

---

## Post-Deployment

### 1. Custom Domain (Optional)

**Jika punya domain sendiri:**

1. Buka Vercel Dashboard
2. Select project → Settings → Domains
3. Add domain
4. Follow instruksi DNS configuration
5. Tunggu propagasi (5-48 jam)

**Example:**
```
yourcompany.com → smart-inclusive-puzzle.vercel.app
```

### 2. SSL Certificate

Vercel otomatis generate SSL, jadi website Anda HTTPS ✅

Check: Lock icon di browser URL bar

### 3. Environment Variables

Jika ada API keys atau config:

1. Settings → Environment Variables
2. Add variable
3. Deploy ulang

---

## Troubleshooting

### Problem: Gambar tidak muncul setelah deploy

**Solusi:**
- Pastikan assets folder terupload
- Check path di HTML (should be `assets/puzzle-image.jpg`)
- Gunakan relative paths, bukan absolute

```javascript
// ✅ Benar
<img src="assets/puzzle.jpg">

// ❌ Salah
<img src="/root/assets/puzzle.jpg">
```

### Problem: Voice tidak bekerja

**Solusi:**
- Deploy dengan HTTPS (Vercel sudah otomatis)
- Test di mobile browser, cek izin microphone
- Some browsers require HTTPS untuk audio

### Problem: Loading lambat

**Solusi:**
- Compress gambar (< 300KB total)
- Enable browser caching
- Use CDN (Vercel sudah provide)

Vercel akan otomatis optimize:
- Minify JS/CSS
- Compress images
- Cache di edge locations

### Problem: Deploy gagal

**Cek:**
- ✅ File syntax correct? (No broken HTML/CSS/JS)
- ✅ Semua file ter-commit di git?
- ✅ GitHub connection authorized?
- ✅ No private node_modules?

**Debug:**
```bash
# Check git status
git status

# View deployment logs di Vercel dashboard
# Project → Deployments → [Pilih deployment] → Logs
```

---

## Continuous Deployment (Auto Deploy)

Setelah setup GitHub connection, setiap push ke main branch akan auto-deploy!

```bash
# Edit file
# Commit & push
git add .
git commit -m "Update puzzle questions"
git push origin main

# Vercel otomatis detect dan deploy 🚀
```

---

## Rollback ke Versi Sebelumnya

Jika ada issue:

1. Vercel dashboard → Deployments
2. Click deployment yang ingin di-restore
3. Click "Redeploy"

---

## Monitoring & Analytics

### Access Logs

```bash
vercel log
```

### Build Time

Default: < 30 seconds (usually < 10s for static site)

### Performance

Vercel provide:
- Page Speed Insights
- Core Web Vitals
- Error tracking

Check di: Project → Analytics

---

## Best Practices

### 1. Versioning

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Branch Strategy

```bash
# Main branch = Production
main → Deployed to vercel.com

# Development branch
develop → Testing sebelum merge ke main
```

### 3. Deployment Checklist

- ✅ All tests pass
- ✅ No console errors
- ✅ Images optimized
- ✅ All features working
- ✅ Mobile responsive
- ✅ Performance acceptable

### 4. Regular Updates

Keep dependencies updated:
```bash
npm update
vercel
```

---

## Advanced: CI/CD Pipeline

### Automated Testing sebelum Deploy

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          production: true
```

1. Generate token di vercel.com/account/tokens
2. Add secret di GitHub → Settings → Secrets

---

## Cost

**Vercel Pricing:**
- Hobby (free): Unlimited static site hosting ✅
- Pro: $20/month (untuk advanced features)

**Smart Inclusive Puzzle** cocok di free tier!

---

## Support

Jika ada masalah:

1. **Vercel Docs**: https://vercel.com/docs
2. **GitHub Issues**: Buat issue di repo Anda
3. **Community**: https://vercel.com/support

---

## Checklist Final

Sebelum announce website:

- ✅ Deploy berhasil
- ✅ HTTPS working
- ✅ Domain configured (jika pakai custom)
- ✅ Mobile responsive
- ✅ All features tested
- ✅ Performance acceptable
- ✅ Analytics setup
- ✅ Error tracking enabled

---

**Selamat! Website Anda siap untuk dunia!** 🎉

Untuk pertanyaan: https://vercel.com/help

Good luck! 🚀
