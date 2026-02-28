# ⚡ Quick Start Guide - Smart Inclusive Puzzle

Panduan cepat untuk memulai dalam 5 menit!

## 🚀 5 Minute Setup

### Step 1: Clone Repository (1 menit)

```bash
git clone https://github.com/YOUR_USERNAME/smart-inclusive-puzzle.git
cd smart-inclusive-puzzle
```

### Step 2: Start Server (30 detik)

```bash
# Option A: Python (built-in)
python3 -m http.server 3000

# Option B: Node.js (jika ada)
npx http-server -p 3000
```

### Step 3: Open Browser (30 detik)

```
http://localhost:3000
```

### Step 4: Test Features (3 menit)

- ✅ Click "Mulai Sekarang"
- ✅ Choose microphone permission
- ✅ Jawab beberapa soal
- ✅ Test voice features
- ✅ Check mobile responsiveness (F12 → Toggle device)

---

## 🎯 First Time User Checklist

### Untuk Anak-Anak:
- [ ] Buka website
- [ ] Dengarkan intro dari AI
- [ ] Pilih izin microphone
- [ ] Jawab first puzzle (try both text & voice)
- [ ] See result & celebrate! 🎉

### Untuk Guru/Dev:
- [ ] Lihat struktur file
- [ ] Read FEATURES.md (dokumentasi lengkap)
- [ ] Customize soal (edit puzzle-data.js)
- [ ] Deploy ke Vercel (see DEPLOYMENT.md)

---

## 📁 File Structure Quick Reference

```
smart-inclusive-puzzle/
├── index.html           ← Halaman utama
├── styles.css           ← Styling & layout
├── script.js            ← Logic utama
├── puzzle-data.js       ← Soal & helper functions
├── package.json         ← Project metadata
├── vercel.json          ← Vercel config
├── .gitignore           ← Git ignore rules
├── README.md            ← Overview
├── FEATURES.md          ← Dokumentasi lengkap
├── DEPLOYMENT.md        ← Cara deploy
├── QUICKSTART.md        ← File ini
└── assets/              ← Gambar & aset
    └── ASSETS.md        ← Guide gambar
```

---

## ⚙️ Quick Customization

### Ubah Soal Puzzle

**File**: `puzzle-data.js`

```javascript
// Cari bagian ini:
const PUZZLE_QUESTIONS = [
    {
        id: 1,
        pieceNumber: 1,
        question: "UBAH SOAL INI",
        answer: "jawaban",
        alternatives: ["jawaban", "alt1"],
        hint: "Petunjuk",
        explanation: "Penjelasan"
    },
    // ... soal lainnya
];
```

### Ubah Warna Website

**File**: `styles.css`

```css
:root {
    --primary-color: #6366f1;      /* Ubah warna utama */
    --secondary-color: #ec4899;    /* Ubah warna secondary */
    --success-color: #10b981;      /* Ubah warna success */
    /* ... dll */
}
```

### Ubah AI Voice Language

**File**: `script.js`

Cari fungsi `speakText()`:

```javascript
function speakText(text, lang = 'id-ID') {
    // Ubah 'id-ID' ke bahasa lain:
    // 'en-US' untuk English
    // 'ms-MY' untuk Melayu
    // 'zh-CN' untuk Mandarin
    // dll
}
```

---

## 🚀 Deploy ke Vercel (2 menit)

### Step 1: Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect ke Vercel
- Buka vercel.com
- Click "Import Project"
- Pilih GitHub repo
- Click "Deploy"

**Done!** Website Anda live di `https://smart-inclusive-puzzle.vercel.app`

*(Lihat DEPLOYMENT.md untuk detail lengkap)*

---

## 🆘 Troubleshooting Cepat

### Website tidak loading?
```
1. Check internet connection
2. Try refresh browser (Ctrl+R)
3. Try different browser
4. Clear cache (Ctrl+Shift+Delete)
```

### Microphone tidak bekerja?
```
1. Check browser permission (Settings > Privacy > Microphone)
2. Check device volume
3. Try refresh page
4. Try Chrome if browser lain tidak work
```

### Soal tidak muncul?
```
1. Open browser console (F12)
2. Check untuk error messages
3. Try refresh
4. Make sure puzzle-data.js di-load properly
```

---

## 📚 Next Steps

Setelah quick start, lihat:

1. **FEATURES.md** - Dokumentasi lengkap semua fitur
2. **DEPLOYMENT.md** - Cara deploy & setup custom domain
3. **assets/ASSETS.md** - Cara integrate gambar puzzle Anda
4. **GitHub Issues** - Untuk bugs & feature requests

---

## 💡 Pro Tips

✅ **Mobile Testing**
- Open dev tools (F12)
- Click "Toggle device toolbar" (mobile icon)
- Test di iPhone, iPad, Android sizes

✅ **Voice Testing**
- Use quiet environment
- Speak clearly
- Test dengan berbagai phrase variants

✅ **Performance**
- Test gambar size < 300KB
- Use browser DevTools Network tab
- Check PageSpeed Insights

✅ **Cross-Browser Testing**
- Test di Chrome, Firefox, Safari
- Test offline behavior (akan be offline-ready soon!)

---

## 🎓 Educational Tips

### Untuk Guru
1. Test dulu sendiri sebelum kelas
2. Practice bersama 1-2 anak dulu
3. Persiapkan quiet room (untuk audio)
4. Have troubleshooting plan

### Untuk Orang Tua
1. Supervise first time
2. Let kid explore sendiri
3. Don't give away answers!
4. Celebrate keberhasilan

---

## 📊 Analytics & Tracking

Websitenya tidak ada analytics built-in saat ini.  
Jika ingin tracking:

1. **Google Analytics**: Add to `<head>` di index.html
2. **Vercel Analytics**: Enable di Vercel dashboard
3. **Custom**: Implement localStorage + backend

---

## 🔐 Security Notes

Aplikasi ini:
- ✅ Pure static site (no backend)
- ✅ No data storage
- ✅ No tracking (by default)
- ✅ No authentication needed
- ✅ Safe untuk digunakan anak-anak

---

## 📞 Need Help?

- **Bugs**: Create GitHub Issue
- **Features**: Create GitHub Discussion
- **Deployment**: Check DEPLOYMENT.md
- **Customization**: Check specific docs
- **General**: Read FEATURES.md

---

## 🎉 Success Checklist

Jika sudah done dengan ini, Anda sudah:
- ✅ Memahami project structure
- ✅ Bisa customize content
- ✅ Bisa deploy ke production
- ✅ Bisa troubleshoot issues dasar
- ✅ Ready untuk teach kids!

---

**Happy teaching & learning!** 🧩📚✨

Last Updated: February 28, 2024
