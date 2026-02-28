# 📖 Complete Setup Guide - Smart Inclusive Puzzle

Panduan lengkap setup, customization, dan deployment untuk Smart Inclusive Puzzle (SIP).

## 📋 Prerequisites

Sebelum mulai, pastikan Anda memiliki:

### Software
- ✅ **Git** (untuk version control)
  ```bash
  git --version  # Check if installed
  ```

- ✅ **Python 3** (untuk local server)
  ```bash
  python3 --version  # Check if installed
  ```

- ✅ **Text Editor** (VS Code, Sublime, etc)

- ✅ **Modern Browser** (Chrome, Firefox, Safari, Edge)

### Hardware
- Komputer/laptop dengan internet
- Microphone (optional, untuk voice features)
- Speaker atau headphone

### GitHub Account (untuk deployment)
- Create free account di https://github.com/signup

---

## 🔧 Installation Steps

### Step 1: Clone Repository

```bash
# Option A: Via HTTPS
git clone https://github.com/YOUR_USERNAME/smart-inclusive-puzzle.git
cd smart-inclusive-puzzle

# Option B: Via SSH (jika sudah setup)
git clone git@github.com:YOUR_USERNAME/smart-inclusive-puzzle.git
cd smart-inclusive-puzzle
```

### Step 2: Verify File Structure

```bash
# Check if all files present
ls -la

# Expected output:
# index.html
# styles.css
# script.js
# puzzle-data.js
# package.json
# vercel.json
# .gitignore
# README.md
# FEATURES.md
# DEPLOYMENT.md
# QUICKSTART.md
# SETUP.md (this file)
# assets/
```

### Step 3: Start Development Server

```bash
# Change to project directory (if not already)
cd smart-inclusive-puzzle

# Start server on port 3000
python3 -m http.server 3000

# You should see:
# Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/)
```

### Step 4: Open in Browser

```
Navigate to: http://localhost:3000
```

**Congratulations!** Website sudah running! ✅

---

## 🎮 First Test

### Basic Flow Test
```
1. Website loads → Welcome screen muncul
2. Click "Mulai Sekarang" atau ucapkan "mulai"
3. Permission screen muncul
4. Pilih "Izinkan Microphone" atau "Lanjut Tanpa"
5. Game screen muncul dengan soal pertama
6. Try jawab 1-2 soal
7. Check hasil
```

### Feature Test Checklist
- [ ] Welcome greeting terdengar?
- [ ] Soal terbaca oleh AI?
- [ ] Bisa input text answer?
- [ ] Bisa input voice answer? (jika izin mic)
- [ ] Validasi jawaban bekerja? (correct/wrong feedback)
- [ ] UI responsive (test via F12 device mode)?
- [ ] Buttons clickable?
- [ ] Message from AI muncul dengan benar?

---

## ✏️ Customization Guide

### 1. Customize Soal Puzzle

**File**: `puzzle-data.js`

**Template:**
```javascript
{
    id: 1,           // Nomor soal (1-16)
    pieceNumber: 1,  // Nomor kepingan puzzle
    question: "Pertanyaan Anda di sini",
    answer: "jawaban utama",
    alternatives: ["jawaban utama", "alternatif 1", "alternatif 2"],
    hint: "Petunjuk jika jawaban salah",
    explanation: "Penjelasan lengkap jawaban"
}
```

**Contoh:**
```javascript
{
    id: 1,
    pieceNumber: 1,
    question: "Berapa hasil dari 10 + 5?",
    answer: "15",
    alternatives: ["15", "lima belas", "lima belas rupiah"],
    hint: "Hitung dengan jari jika perlu",
    explanation: "10 + 5 = 15"
}
```

**Tips:**
- Soal harus disesuaikan level (mudah → susah)
- Answer bisa multiple formats (angka, teks, dll)
- Hint harus helpful, bukan give away answer
- Penjelasan untuk learning

### 2. Customize Final Questions

**File**: `puzzle-data.js`

Cari array `FINAL_QUESTIONS`:

```javascript
const FINAL_QUESTIONS = [
    {
        id: 1,
        question: "Pertanyaan Anda",
        answer: "jawaban",
        alternatives: ["jawaban", "alt1", "alt2"],
        correctAnswer: 15  // numeric answer (optional)
    },
    // ... sampai id 6
];
```

### 3. Customize UI Colors

**File**: `styles.css`

Cari `:root` section:

```css
:root {
    --primary-color: #6366f1;         /* Ungu utama */
    --secondary-color: #ec4899;        /* Pink */
    --success-color: #10b981;          /* Hijau */
    --danger-color: #ef4444;           /* Merah */
    --info-color: #3b82f6;            /* Biru */
    --warning-color: #f59e0b;         /* Oranye */
    --light-bg: #f0f9ff;              /* Latar terang */
    --dark-bg: #1f2937;               /* Latar gelap */
    --text-primary: #1f2937;          /* Text utama */
    --text-secondary: #6b7280;        /* Text secondary */
}
```

**Popular Gradients:**
```css
/* Option 1: Cool Blue-Purple */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Option 2: Hot Orange-Red */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Option 3: Fresh Green */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Option 4: Purple-Pink */
background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
```

### 4. Customize AI Voice

**File**: `script.js`

Cari function `speakText()`:

```javascript
function speakText(text, lang = 'id-ID') {
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = 'id-ID';      // Change language
    utterance.rate = 0.9;           // Speed: 0.5 (slow) ~ 2.0 (fast)
    utterance.pitch = 1;            // Tone: 0.5 ~ 2.0
    utterance.volume = 1;           // Volume: 0 ~ 1
    
    window.speechSynthesis.speak(utterance);
}
```

**Language Options:**
```javascript
'id-ID'    // Indonesian
'en-US'    // English (US)
'en-GB'    // English (UK)
'ms-MY'    // Malay
'zh-CN'    // Mandarin
'ja-JP'    // Japanese
'ko-KR'    // Korean
```

### 5. Add Gambar Puzzle

**File**: `assets/ASSETS.md`

Steps singkat:
1. Prepare puzzle image (800x800px recommended)
2. Place di `assets/puzzle-image.jpg`
3. Modify `placePieceOnBoard()` function di `script.js`
4. Test di browser

*(Detailed guide di assets/ASSETS.md)*

---

## 🐛 Development & Debugging

### Browser DevTools (F12)

```
F12 → Open DevTools
```

**Tabs penting:**
- **Console**: Check error messages, logs
- **Elements**: Inspect HTML structure
- **Network**: Check file loading
- **Storage**: Cache, localStorage Data

### Common Issues & Debug

**Issue: File tidak load**
```
Debug:
1. Console (F12) → lihat error
2. Network tab → check status 200
3. Path correct? (assets/puzzle.jpg)
4. File exist?
```

**Issue: JavaScript error**
```
Debug:
1. Console → lihat error message
2. Check syntax di file yang di-edit
3. Check console.error() di script.js
```

**Issue: Voice tidak bekerja**
```
Debug:
1. Check microphone permission
2. Console → check speech recognition errors
3. Try different browser
4. Check HTTPS (localhost OK, production need HTTPS)
```

### Testing Checklist

- [ ] All files load (Network tab)
- [ ] No console errors (Console tab)
- [ ] Game flow works
- [ ] Buttons responsive
- [ ] Voice features work (if mic enabled)
- [ ] Responsive design (F12 → device mode)

---

## 📱 Responsive Testing

### Desktop (1920px+)
```bash
# Normal browser
- Full layout visible
- Large puzzle board
- Side-by-side layout
```

### Tablet (768px - 1024px)
```bash
# F12 → Toggle Device Toolbar → iPad
- Stacked layout
- Medium puzzle board
- Readable text
```

### Mobile (320px - 767px)
```bash
# F12 → Toggle Device Toolbar → iPhone 12
- Single column
- Smaller puzzle board (2x2 or 1x1 visible)
- Touch-friendly buttons
```

**Test Devices:**
- [ ] iPhone 12 (390x844)
- [ ] iPad (768x1024)
- [ ] Android Phone (360x640)
- [ ] Laptop (1920x1080)

---

## 🚀 Deployment to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Open https://vercel.com
   - Login dengan GitHub
   - Click "New Project"
   - Select repository
   - Framework: "Other" atau "Static"
   - Click "Deploy"

3. **Get URL**
   - Vercel akan generate URL: `https://smart-inclusive-puzzle.vercel.app`
   - Custom domain (optional)

**Pro:** Automatic deployment on push!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (staging)
vercel

# Deploy to production
vercel --prod
```

### Method 3: GitHub Actions (Advanced)

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          production: true
```

---

## 🔒 Environment Variables (Optional)

Jika perlu API keys atau config sensitive:

**Local (.env file):**
```
PUZZLE_API_URL=https://api.example.com
API_KEY=your-secret-key
```

**Vercel Dashboard:**
1. Project → Settings → Environment Variables
2. Add variable name & value
3. Re-deploy

---

## 📊 Analytics & Monitoring

### Google Analytics (Optional)

Tambahkan ke `index.html` di `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` dengan Google Analytics ID Anda.

### Vercel Analytics

1. Vercel Dashboard → Project → Analytics
2. Auto-enabled
3. View Core Web Vitals, etc

---

## 🔄 Git Workflow

### Day-to-Day Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-questions

# 2. Make changes
# (edit files...)

# 3. Check status
git status

# 4. Stage changes
git add .

# 5. Commit
git commit -m "Add new math questions"

# 6. Push
git push origin feature/new-questions

# 7. Create Pull Request (di GitHub)
```

### Versioning

```bash
# Create git tag for release
git tag v1.0.0
git push origin v1.0.0

# View all tags
git tag --list

# Release notes (di GitHub) → Releases
```

---

## 🧪 Testing Best Practices

### Manual Testing

```
Test Case: User answers correctly
→ Input correct answer
→ System shows success message
→ Piece placed on board
→ Next question appears

Test Case: User answers incorrectly (1st attempt)
→ Input wrong answer
→ System shows hint
→ Same question repeats
→ User tries again

Test Case: Voice input
→ Click "🎤 Mulai Dengarkan"
→ Speak answer clearly
→ System recognize & validate
→ Show result (correct/wrong)
```

### Performance Testing

```bash
# Lighthouse (F12 → Lighthouse Tab)
- Performance
- Accessibility
- Best Practices
- SEO

Target:
- Performance: > 80
- Accessibility: > 90
```

---

## 🆘 Common Issues & Solutions

### Issue: "Port 3000 already in use"
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Git remote URL wrong"
```bash
# Check current remote
git remote -v

# Update remote
git remote set-url origin https://github.com/NEW_URL
```

### Issue: "Mixed content" error (HTTPS)
```
Be sure all assets use relative paths:
✅ assets/image.jpg
❌ https://domain.com/image.jpg
❌ http://localhost:3000/image.jpg
```

---

## 📚 Study Resources

### Web Development
- MDN Web Docs: https://developer.mozilla.org
- Web APIs: https://developer.mozilla.org/en-US/docs/Web/API
- CSS Tricks: https://css-tricks.com

### Speech API
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- Speech Synthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance

### Deployment
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com

---

## 🎓 Learning Path

**If you're new to web development:**

1. **Week 1**: Learn HTML basics
   - https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/

2. **Week 2**: Learn CSS basics
   - https://www.freecodecamp.org/learn/responsive-web-design/basic-css/

3. **Week 3**: Learn JavaScript
   - https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/

4. **Week 4**: Customize this project!

---

## ✅ Final Checklist

Sebelum go-to-production:

- [ ] Soal customize sesuai kebutuhan
- [ ] Warna & design sesuai preferensi
- [ ] Gambar puzzle integrated (optional)
- [ ] Tested di multiple browsers
- [ ] Tested di mobile devices
- [ ] Voice features tested
- [ ] No console errors
- [ ] Performance acceptable (> 80 Lighthouse)
- [ ] Deployed to Vercel
- [ ] Custom domain configured (optional)
- [ ] Analytics setup (optional)
- [ ] Share with community!

---

## 🎉 Success!

Jika Anda sudah complete artikel ini, Anda sekarang:
- ✅ Understand project structure
- ✅ Can customize content
- ✅ Can deploy to production
- ✅ Can debug issues
- ✅ Ready untuk teach!

---

## 📞 Support

- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Features**: Create GitHub Issue

---

**Happy Learning & Teaching!** 🧩📚✨

Last Updated: February 28, 2024
Version: 1.0.0
