# Asset Integration Guide 🖼️

## Cara Menggunakan Gambar Puzzle Anda

Untuk mengintegrasikan gambar puzzle Anda (foto Smart Inclusive Puzzle), ikuti langkah-langkah di bawah:

### 1. Menyiapkan Gambar

**Persyaratan Gambar:**
- Format: PNG, JPG, atau WebP
- Resolusi: Minimal 800x800px (untuk detail yang bagus di semua ukuran)
- Ukuran file: < 500KB (untuk loading cepat)
- Aspect ratio: Square (1:1) atau disesuaikan dengan grid 4x4

### 2. Menempatkan Gambar

```
assets/
├── puzzle-image.jpg      ← Letakkan gambar puzzle di sini
└── README.md             ← File ini
```

### 3. Update JavaScript

Edit file `script.js` dan modifikasi fungsi `placePieceOnBoard()`:

**Current version:**
```javascript
function placePieceOnBoard(pieceNumber) {
    const position = pieceNumber - 1;
    const slot = document.getElementById(`slot-${position}`);
    
    slot.innerHTML = `<div style="text-align: center; font-size: 24px;">✓</div>`;
    slot.classList.add('filled');
    // ...
}
```

**Updated untuk menampilkan gambar puzzle:**
```javascript
function placePieceOnBoard(pieceNumber) {
    const position = pieceNumber - 1;
    const slot = document.getElementById(`slot-${position}`);
    
    // Calculate the crop area untuk piece ini dari gambar utuh
    const imageX = (position % 4) * 200;  // 800/4 = 200px per piece
    const imageY = Math.floor(position / 4) * 200;
    
    const pieceHtml = `
        <div class="puzzle-piece-image" style="
            background-image: url('assets/puzzle-image.jpg');
            background-position: -${imageX}px -${imageY}px;
            background-size: 800px 800px;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
        "></div>
        <span class="piece-number">${pieceNumber}</span>
    `;
    
    slot.innerHTML = pieceHtml;
    slot.classList.add('filled');
    // ...
}
```

### 4. Update CSS (styless.css)

Tambahkan CSS untuk piece images:

```css
.puzzle-piece-image {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.puzzle-slot.filled {
    padding: 0;
    overflow: hidden;
}
```

### 5. Alternative: Crop dan Split Gambar

Jika ingin lebih efisien, bisa crop gambar menjadi 16 piece terpisah:

**Struktur folder:**
```
assets/
├── puzzle/
│   ├── piece-1.jpg
│   ├── piece-2.jpg
│   ├── piece-3.jpg
│   └── ... (piece-16.jpg)
└── README.md
```

**Update JavaScript:**
```javascript
function placePieceOnBoard(pieceNumber) {
    const position = pieceNumber - 1;
    const slot = document.getElementById(`slot-${position}`);
    
    slot.innerHTML = `
        <img src="assets/puzzle/piece-${pieceNumber}.jpg" 
             alt="Piece ${pieceNumber}" 
             style="width: 100%; height: 100%; border-radius: 6px;">
        <span class="piece-number">${pieceNumber}</span>
    `;
    
    slot.classList.add('filled');
    document.getElementById(`piece-${pieceNumber}`).classList.add('used');
    puzzleSolvedPositions.add(position);
}
```

## Tools untuk Crop Gambar

### Online Tools (Mudah)
1. **Photoshop/Photopea** (https://www.photopea.com)
   - Upload gambar
   - Crop 4x4 grid (16 pieces)
   - Export satu-satu

2. **Pixlr** (https://pixlr.com)
   - Crop & resize tools
   - Export bulk

3. **Smart Crop** (https://www.smartcrop.com)
   - Automatic grid crop

### Command Line (Advanced)

```bash
# Install ImageMagick (jika belum ada)
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick
# Windows: Download dari https://imagemagick.org

# Crop gambar menjadi 4x4 grid (16 piece)
magick convert assets/puzzle-image.jpg -crop 25%x25%@ +repage assets/puzzle/piece-%d.jpg
```

### Python Script

```python
from PIL import Image

# Buka gambar
img = Image.open('assets/puzzle-image.jpg')
width, height = img.size

# Hitung ukuran piece
piece_width = width // 4
piece_height = height // 4

# Crop dan save setiap piece
piece_number = 1
for row in range(4):
    for col in range(4):
        left = col * piece_width
        top = row * piece_height
        right = left + piece_width
        bottom = top + piece_height
        
        piece = img.crop((left, top, right, bottom))
        piece.save(f'assets/puzzle/piece-{piece_number}.jpg')
        piece_number += 1
```

## Responsive Gambar

Untuk memastikan gambar terlihat bagus di semua device:

```css
.puzzle-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    display: block;
}

/* Mobile optimization */
@media (max-width: 576px) {
    .puzzle-board {
        gap: 6px;
        padding: 12px;
    }
    
    .puzzle-slot {
        aspect-ratio: 1;
    }
}
```

## Troubleshooting 🔧

**Gambar tidak muncul:**
- ✅ Cek path gambar di HTML/CSS
- ✅ Pastikan file exist di folder assets
- ✅ Check console untuk error (F12)
- ✅ Bersihkan browser cache (Ctrl+Shift+Delete)

**Gambar blur atau pixelated:**
- ✅ Gunakan gambar dengan resolusi tinggi (2000x2000px minimum)
- ✅ Export sebagai PNG untuk kualitas terbaik
- ✅ Optimize image size dengan tools seperti TinyPNG

**Gambar terlalu besar (loading lambat):**
- ✅ Compress image (< 500KB total)
- ✅ Gunakan WebP format (lebih kecil dari JPG)
- ✅ Lazy load images

```css
/* Add to styles.css untuk lazy loading */
.puzzle-slot img {
    loading: lazy;
}
```

## Performance Tips 📊

1. **Minimal konten**
   - File gambar: < 300KB
   - CSS: < 50KB
   - JS: < 100KB

2. **Caching**
   - Vercel auto-cache aset statis
   - Browser cache 1 jam

3. **Compression**
   ```bash
   # Gunakan pngquant untuk PNG
   pngquant --quality=65-80 assets/puzzle-image.png
   
   # Atau jpegoptim untuk JPG
   jpegoptim --max=80 assets/puzzle-image.jpg
   ```

## Preview Gambar di GitHub

Di README.md bisa tambahkan:

```markdown
## 🎨 Preview

![Smart Inclusive Puzzle](assets/puzzle-image.jpg)
```

## Questions? 💡

Jika ada pertanyaan tentang integrasi gambar, silakan:
1. Check issue yang ada
2. Buat issue baru dengan screenshot
3. Mention @admin atau @maintainer

---

**Happy Puzzling!** 🧩✨
