# 🧩 Smart Inclusive Puzzle (SIP) - Dokumentasi Fitur Lengkap

**Versi**: 1.0.0  
**Tanggal**: Februar 2024  
**Bahasa**: Indonesian  
**Status**: ✅ Production Ready  

---

## 📚 Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Fitur Utama](#fitur-utama)
3. [Alur Permainan](#alur-permainan)
4. [Panduan Pengguna](#panduan-pengguna)
5. [Fitur Voice & AI](#fitur-voice--ai)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Pengenalan

### Apa itu Smart Inclusive Puzzle?

Smart Inclusive Puzzle (SIP) adalah platform pembelajaran interaktif yang menggabungkan:
- 🧩 **Puzzle Digital**: 16 kepingan puzzle yang menyenangkan
- 🤖 **AI Assistant**: Asisten cerdas berbasis teknologi TTS
- 🎤 **Voice Recognition**: Pengenalan suara untuk jawaban
- 📱 **Responsive Design**: Bekerja di semua device
- 🎓 **Educational**: Soal-soal matematika SD yang terstruktur

### Tujuan
Membuat pembelajaran matematika menjadi **menyenangkan**, **interaktif**, dan **accessible** untuk semua anak.

### Target User
- Siswa SD kelas 3-4 (Usia 8-10 tahun)
- Guru untuk pembelajaran di sekolah
- Orang tua untuk pembelajaran di rumah

---

## Fitur Utama

### 1️⃣ Sistem Puzzle Interaktif

**16 Kepingan Puzzle**
- Setiap kepingan memiliki soal matematika yang berbeda
- Soal disajikan secara **acak** (bukan berurutan)
- Pengguna jawab soal → kepingan otomatis terpasang

**Contoh Urutan:**
```
AI baca soal kepingan #7 → User jawab → Masuk ke posisi #7 papan
AI baca soal kepingan #2 → User jawab → Masuk ke posisi #2 papan
AI baca soal kepingan #14 → User jawab → Masuk ke posisi #14 papan
... (dan seterusnya acak)
```

**Sistem Jawaban**
- User bisa jawab **maksimal 3 kali** per soal
- Jawaban salah → Diberikan hint
- Jawaban benar → Kepingan terpasang + lanjut soal berikutnya

---

### 2️⃣ AI Assistant dengan Voice

**Text-to-Speech (TTS)**
- AI membacakan setiap pertanyaan dengan suara natural
- Kecepatan: Normal (mudah dipahami anak)
- Bahasa: Bahasa Indonesia
- User bisa tekan tombol 🔊 untuk dengarkan ulang

**Speech-to-Text (STT)**
- User bisa jawab dengan bersuara (bukan hanya ketik)
- Deteksi otomatis jawaban yang benar/salah
- Feedback langsung dari AI

**Voice Commands**
User bisa control aplikasi dengan suara:
```
"mulai"         → Mulai permainan
"kirim"         → Kirim jawaban
"lewati"        → Lewati soal
"reset"         → Ulang permainan
```

---

### 3️⃣ 16 Soal Puzzle

Setiap soal dirancang untuk siswa SD dengan tingkat kesulitan bertahap:

| # | Topik | Soal | Jawaban | Tingkat |
|---|-------|------|---------|---------|
| 1 | Penjumlahan & Pengurangan | Ibu membeli 3 kotak telur... | 21 | Sedang |
| 2 | Pengurangan | Rina memiliki 25 permen... | 16 | Mudah |
| 3 | Perkalian | Toko jual 8 buku/hari... | 56 | Mudah |
| 4 | Perkalian | Ayah beli 4 kantong jeruk... | 48 | Mudah |
| ... | ... | ... | ... | ... |

**Lihat detail semua soal di**: [puzzle-data.js](puzzle-data.js)

---

### 4️⃣ 6 Soal Final

Setelah puzzle selesai, ada 6 soal penguatan:

1. **Penjumlahan** (12 + 8 = ?) → Jawab: 20
2. **Pengurangan** (25 - 9 = ?) → Jawab: 16
3. **Perkalian** (6 × 15 = ?) → Jawab: 90
4. **Perkalian** (4 × 12 = ?) → Jawab: 48
5. **Pembagian** (240 ÷ 30 = ?) → Jawab: 8
6. **Multi-Step** (50 - 18 - 7 = ?) → Jawab: 25

---

### 5️⃣ Responsive Design

**Device Support**
✅ Desktop/Laptop (1920px+)
✅ Tablet (768px - 1024px)
✅ Smartphone (320px - 767px)

**Fitur Responsif**
- Layout auto-adjust sesuai ukuran layar
- Touch-friendly buttons (min 44x44px)
- Swipe support untuk puzzle pieces
- Text readable di semua ukuran

---

### 6️⃣ Microphone Permission

**Single Permission Flow**
```
User buka web → Lihat permission screen
                ├─ Klik "Izinkan" → Microphone enabled
                └─ Klik "Lanjut Tanpa" → Mode text-only
                
Selama di website → Izin terpelihara
User keluar website → Izin reset
```

**Privacy**
- Izin hanya untuk microphone, tidak data lain
- No cloud recording
- Data lokal di device saja

---

## Alur Permainan

### Visual Flow Diagram

```
┌─────────────────┐
│  Welcome Screen │ ◄── User masuk website
└────────┬────────┘
         │
         v
┌─────────────────────────┐
│  AI Greeting dalam Bahasa│ ◄── "Halo, selamat datang!"
└────────┬────────────────┘
         │
         v
┌──────────────────────┐
│  Permission Screen   │
├──────────┬───────────┤
│ Izinkan  │  Lanjut   │
│Microphone│  Tanpa    │
└────┬─────┴────┬──────┘
     │          │
     v          v
    ✅         ⚠️
  (Voice)     (Text)
     │          │
     └────┬─────┘
          v
┌──────────────────────────┐
│  Game Screen Start       │
│  (Puzzle Presentation)   │
└────────┬─────────────────┘
         │
         v
    ╔════════════════════════════════╗
    ║ LOOP: 16 Soal Puzzle           ║
    ╠════════════════════════════════╣
    ║ 1. AI baca soal                ║
    ║ 2. User jawab (text/voice)     ║
    ║ 3. Check jawaban               ║
    ║    ├─ Benar → Terpasang        ║
    ║    └─ Salah → Hint + Ulang     ║
    ║ 4. Next soal (acak posisi)     ║
    ╚════════════════════════════════╝
         │
         v (16x puzzle selesai)
┌──────────────────────────┐
│  Results Screen          │
│  "Selamat! Puzzle selesai"
└────────┬─────────────────┘
         │
         v
┌──────────────────────────┐
│  Final 6 Questions       │
│  (Soal Penguatan)        │
└────────┬─────────────────┘
         │
         v
┌──────────────────────────┐
│  Completion Screen       │
│  🎉 Luar Biasa!         │
│  (Confetti Animation)    │
│  (Statistics Display)    │
└──────────────────────────┘
```

### Timeline Permainan

```
0 min:  User buka website
        ↓ Lihat greeting
        
0:30:   Pilih permission (mic atau tidak)
        ↓ Load game
        
1:00:   Puzzle game mulai
        ├─ Soal 1-3: Mudah, cepat terjawab (3 min)
        ├─ Soal 4-10: Sedang (15 min)
        ├─ Soal 11-16: Trickier (12 min)
        
31 min: Semua 16 soal selesai
        ↓
32 min: Lihat results screen
        ↓
33 min: Final 6 questions muncul
        ├─ User jawab satu-satu (10 min)
        
43 min: Final completion screen
        ↓ Optional: Lihat stats & share
        
~45 min TOTAL (estimasi pembelajaran)
```

---

## Panduan Pengguna

### Untuk Anak-Anak (Pengguna)

#### Step 1: Buka Website
```
https://smart-inclusive-puzzle.vercel.app
(atau domain custom Anda)
```

#### Step 2: Dengarkan Sapaan AI
- AI akan menyapa dalam bahasa Indonesia
- Baca welcome message
- Tekan tombol atau ucapkan "mulai"

#### Step 3: Izin Microphone (Optional)
```
Pilih:
   ✅ "Izinkan Microphone" → Bisa jawab dengan suara
   ⚠️ "Lanjut Tanpa" → Hanya ketik jawaban
```

#### Step 4: Main Puzzle!

**Cara Jawab:**
1. Dengarkan pertanyaan dari AI (atau baca di layar)
2. Pilih answer method:
   - **Ketik**: Tulis jawaban → Click "Kirim"
   - **Suara**: Click "🎤 Mulai Dengarkan" → Ucapkan jawaban
3. AI akan cek jawaban Anda
4. ✅ Benar → Kepingan terpasang
5. ❌ Salah → Coba lagi (max 3x)

**Tips:**
- Listen carefully ke pertanyaan
- Answer harus exact (atau close match)
- Jika stuck, click "Lewati" untuk soal berikutnya
- Click "🔊 Dengarkan Ulang" untuk repeat soal

#### Step 5: Final Questions
- Jawab 6 soal terakhir (graded)
- Semua pilihan jawaban yang disajikan di satu halaman
- Click "Submit" untuk final result

#### Step 6: Celebrate! 🎉
- Lihat hasil akhir
- Baca pesan encouragement dari AI
- Optional: Share hasil Anda

---

### Untuk Guru/Orang Tua

#### Setup di Kelas
1. Siapkan device (laptop/tablet per anak)
2. Akses website dari semua device
3. Atur izin microphone di device (setup sekali)
4. Monitor dari guru screen (optional)

#### Monitoring Progress
- Lihat soal yang dijawab anak
- Check completion persentase
- Read final results

#### Tips Pembelajaran
```
📌 Sebelum Mulai:
   - Jelaskan cara main
   - Practice izin microphone
   - Siapkan headphone (untuk grup)
   
📌 Selama Bermain:
   - Biarkan anak eksplor sendiri
   - Help dengan izin mic kalau ada trouble
   - Encourage untuk jawab sendiri (jangan dibantu)
   
📌 Sesudah Selesai:
   - Review final results
   - Discuss soal yang sulit
   - Celebrate keberhasilan!
```

---

## Fitur Voice & AI

### Text-to-Speech (TTS) Details

**Spesifikasi:**
```javascript
Language: id-ID (Bahasa Indonesia)
Rate: 0.9 (90% normal speed)
Pitch: 1 (normal tone)
Volume: 1 (maximum)
```

**Kapan TTS Digunakan:**
- ✅ Welcome greeting
- ✅ Permission screen info
- ✅ Setiap soal puzzle
- ✅ Hint ketika jawaban salah
- ✅ Feedback correct/wrong
- ✅ Game completion message

### Speech-to-Text (STR) Details

**Technology:** Web Speech API (Native Browser)
**Language:** id-ID
**Accuracy:** ~85-90% (bervariasi per device)

**Kapan STR Aktif:**
- User click "🎤 Mulai Dengarkan"
- User ucapkan jawaban
- AI auto-detect & process

**Supported Devices:**
- ✅ Desktop Chrome/Edge (best support)
- ✅ Chrome Mobile (Android)
- ✅ Safari (iOS 14.5+)
- ⚠️ Firefox (limited support)

### Voice Commands

```
Command         | Action
===============================
"mulai"         | Start game
"kirim"         | Submit answer
"lewati"        | Skip question
"reset"         | Restart game
"ulang"         | Repeat (same as "reset")
"dengarkan"     | Repeat question
```

### Troubleshooting Voice

**Problem: Microphone tidak dikenali**
```
Solution:
1. Check browser permissions
2. Try different browser
3. Use HTTPS (vercel auto-https)
4. Restart device
```

**Problem: STR tidak akurat**
```
Solution:
1. Speak clearly, normal pace
2. Avoid background noise
3. Use microphone yang bagus
4. Restart speech recognition (refresh page)
```

**Problem: TTS sound tidak terdengar**
```
Solution:
1. Check device volume
2. Check browser volume (some browser have per-tab control)
3. Check speaker/headphone connection
4. Restart page
```

---

## 6 Soal Final Lengkap

### Soal 1: Penjumlahan Dasar
**Question:** "Di sebuah kelas terdapat 12 siswa laki-laki dan 8 siswa perempuan. Berapa jumlah seluruh siswa di kelas tersebut?"
**Answer:** 20
**Alternatif:** 20, dua puluh, 20 siswa

### Soal 2: Pengurangan
**Question:** "Rina memiliki 25 permen. Ia membagikan 9 permen kepada temannya. Berapa sisa permen Rina sekarang?"
**Answer:** 16
**Alternatif:** 16, enam belas, 16 permen

### Soal 3: Perkalian
**Question:** "Sebuah perpustakaan memiliki 6 rak buku. Setiap rak berisi 15 buku. Berapa jumlah seluruh buku di perpustakaan tersebut?"
**Answer:** 90
**Alternatif:** 90, sembilan puluh, 90 buku

### Soal 4: Perkalian Lagi
**Question:** "Ayah membeli 4 kantong jeruk. Setiap kantong berisi 12 jeruk. Berapa jumlah seluruh jeruk yang dibeli ayah?"
**Answer:** 48
**Alternatif:** 48, empat puluh delapan, 48 jeruk

### Soal 5: Pembagian
**Question:** "Sebuah sekolah memiliki 240 siswa. Jika setiap kelas berisi 30 siswa, berapa jumlah kelas yang ada di sekolah tersebut?"
**Answer:** 8
**Alternatif:** 8, delapan, 8 kelas

### Soal 6: Multi-Step Calculation
**Question:** "Doni memiliki 50 ribu rupiah. Ia membeli buku seharga 18 ribu rupiah dan pensil seharga 7 ribu rupiah. Berapa sisa uang Doni sekarang?"
**Answer:** 25000
**Alternatif:** 25000, 25 ribu, dua puluh lima ribu, 25

---

## Troubleshooting

### 🔴 Critical Issues

#### Website tidak loading
```
Check:
1. Internet connection aktif?
2. Browser supported? (Chrome, Firefox, Safari)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try different browser
```

#### Game crash/freeze
```
Solution:
1. Refresh halaman (Ctrl+R)
2. Clear cookies & cache
3. Restart browser
4. Restart device
```

---

### 🟡 Audio Issues

#### Microphone not working
```
Check:
1. Device mic enabled?
2. Browser permission granted?
   → Settings → Privacy → Microphone
3. Try: https:// (not http)
4. Restart browser
5. Update browser to latest version
```

#### No sound from speaker
```
Check:
1. Device volume up?
2. Mute switch off? (especially mobile)
3. Headphone plugged in?
4. Try different browser
5. Check if other sounds work (YouTube, etc)
```

#### Voice recognition inaccurate
```
Tips:
1. Speak clearly
2. Use good microphone
3. Quiet environment
4. Normal pace (not too fast)
5. Try refreshing page & retry
```

---

### 🟡 Gameplay Issues

#### Jawaban tidak diterima meskipun benar
```
Reason:
- Answer format berbeda (e.g., "20" vs "twenty")
- Typo? (e.g., "12" vs "l2")
- Extra space? (" 20 " vs "20")

Solution:
1. Try retype jawaban
2. Use alternatives (e.g., "dua puluh" instead of "20")
3. Skip & continue
```

#### Cannot click buttons
```
Check:
1. Button enabled? (not grayed out)
2. Page fully loaded?
3. Try refresh
4. Try different browser
```

#### Puzzle pieces not moving
```
Solution:
1. Click on piece to select
2. Check if piece already used
3. Try drag instead of click
4. Mobile: try dragging
```

---

## FAQ

### ❓ Umum

**Q: Berapa lama waktu yang dibutuhkan untuk selesai?**
A: Estimasi 45 menit hingga 1 jam, tergantung kecepatan jawab.

**Q: Apakah ada time limit per soal?**
A: Tidak, user bisa jawab tanpa terbatas waktu.

**Q: Boleh pakai calculator?**
A: Untuk learning purpose, better jika user hitung sendiri. Tapi tidak ada pembatasan di sistem.

**Q: Bisatepatkan soal?**
A: Yes, pakai tombol "Lewati Kepingan Ini".

---

### ❓ Voice & Microphone

**Q: Apakah microphone wajib?**
A: Tidak, user bisa pilih "Lanjut Tanpa Microphone".

**Q: Berapa kali perlu izin microphone?**
A: Hanya sekali, diperminta di awal game.

**Q: Apakah suara saya disimpan?**
A: Tidak, semuanya real-time local processing saja.

**Q: Bahasa apa yang digunakan?**
A: Bahasa Indonesia (id-ID).

**Q: Bisaubah bahasa AI?**
A: Ya, edit `script.js` bagian `utterance.lang = 'id-ID'` → ubah ke `en-US` dll.

---

### ❓ Technical

**Q: Apa persyaratan hardware minimum?**
A: Browser modern + microphone (optional).

**Q: Bisakah offline?**
A: Tidak, perlu internet connection. (Bisa di-enhance di masa depan).

**Q: Where data disimpan?**
A: Lokal di browser memory (temporary). No server storage.

**Q: Berapa besar file website?**
A: ~300KB total (HTML + CSS + JS + data).

**Q: Bisadeploy ke server own?**
A: Ya, buka [DEPLOYMENT.md](DEPLOYMENT.md) untuk instruksi.

---

### ❓ Customization

**Q: Bisaubah soal-soalnya?**
A: Yes, edit [puzzle-data.js](puzzle-data.js) dan sesuaikan `PUZZLE_QUESTIONS` array.

**Q: Bisaubah warna?**
A: Yes, edit [styles.css](styles.css) variabel `--primary-color`, `--secondary-color`, dll.

**Q: Bisaubah gambar puzzle?**
A: Yes, lihat [assets/ASSETS.md](assets/ASSETS.md) untuk instruksi.

**Q: Bisatambah lebih banyak soal?**
A: Ya, update array di `puzzle-data.js` (tapi perlu adjust grid dari 4x4 menjadi lebih besar).

---

### ❓ Support

**Q: Bisachat dengan developer?**
A: Create GitHub issue di repository.

**Q: Ada bug, apa yang harus saya lakukan?**
A: Report di GitHub Issues dengan:
- Device/browser info
- Screenshot error
- Steps to reproduce

**Q: Bisaminta fitur baru?**
A: Silakan buat GitHub Discussion atau Issue.

---

## Roadmap Fitur Mendatang 🚧

```
✅ v1.0.0 (Current)
   - 16 soal puzzle
   - 6 soal final
   - Voice recognition
   - Responsive design

⏳ v1.1.0 (Next)
   - Offline support (PWA)
   - Leaderboard
   - Progress tracking
   - Multiple languages

📅 v2.0.0 (Future)
   - Multiplayer mode
   - Custom puzzle creator
   - Admin dashboard
   - API for schools
   - Mobile app
```

---

## Credits & License

**Developer**: Smart Inclusive Puzzle Team  
**License**: MIT (Open Source)  
**Tech Stack**: HTML5, CSS3, Vanilla JS, Web Speech API

**Special Thanks:**
- Web Speech API (Google)
- Vercel (Hosting)
- Community feedback

---

## Contact & Support

📧 Email: support@smartinclusivepuzzle.com  
🐙 GitHub: https://github.com/your-repo  
📱 Website: https://smart-inclusive-puzzle.vercel.app

---

**Last Updated**: February 28, 2024  
**Version**: 1.0.0 (Production Ready)  
**Status**: ✅ LIVE

---

*Terima kasih sudah menggunakan Smart Inclusive Puzzle!*  
*Bersama kita buat pembelajaran menjadi menyenangkan.* 🎓✨
