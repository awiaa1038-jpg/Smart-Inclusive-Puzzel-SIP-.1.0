/**
 * Puzzle Data - Smart Inclusive Puzzle (SIP)
 * Berisi 16 soal puzzle dan 6 soal final
 */

// 16 Soal Puzzle (acak & bersesuaian dengan posisi kepingan puzzle)
const PUZZLE_QUESTIONS = [
    // Kepingan 1
    {
        id: 1,
        pieceNumber: 1,
        question: "Ibu membeli 3 kotak telur. Setiap kotak berisi 12 butir telur. Jika ibu menggunakan 15 butir telur untuk membuat kue, berapa sisa telur yang dimiliki ibu sekarang?",
        answer: "21",
        alternatives: ["21", "dua puluh satu", "21 butir"],
        hint: "Hitung total telur dulu, baru kurangi yang digunakan",
        explanation: "3 × 12 = 36 butir, kemudian 36 - 15 = 21 butir telur"
    },
    
    // Kepingan 2
    {
        id: 2,
        pieceNumber: 2,
        question: "Rina memiliki 25 permen. Ia membagikan 9 permen kepada temannya. Berapa sisa permen Rina sekarang?",
        answer: "16",
        alternatives: ["16", "enam belas", "16 permen"],
        hint: "Kurangi total permen dengan permen yang dibagikan",
        explanation: "25 - 9 = 16 permen"
    },
    
    // Kepingan 3
    {
        id: 3,
        pieceNumber: 3,
        question: "Sebuah toko buku menjual 8 buku setiap hari. Berapa buku yang terjual dalam 7 hari?",
        answer: "56",
        alternatives: ["56", "lima puluh enam", "56 buku"],
        hint: "Kalikan buku per hari dengan jumlah hari",
        explanation: "8 × 7 = 56 buku"
    },
    
    // Kepingan 4
    {
        id: 4,
        pieceNumber: 4,
        question: "Ayah membeli 4 kantong jeruk. Setiap kantong berisi 12 jeruk. Berapa jumlah seluruh jeruk yang dibeli ayah?",
        answer: "48",
        alternatives: ["48", "empat puluh delapan", "48 jeruk"],
        hint: "Kalikan jumlah kantong dengan jeruk per kantong",
        explanation: "4 × 12 = 48 jeruk"
    },
    
    // Kepingan 5
    {
        id: 5,
        pieceNumber: 5,
        question: "Anton memiliki 60 kelereng. Dia memberikan 25 kelereng kepada Budi. Berapa sisa kelereng Anton?",
        answer: "35",
        alternatives: ["35", "tiga puluh lima", "35 kelereng"],
        hint: "Kurangi kelereng Anton dengan yang diberikan",
        explanation: "60 - 25 = 35 kelereng"
    },
    
    // Kepingan 6
    {
        id: 6,
        pieceNumber: 6,
        question: "Sebuah perpustakaan memiliki 6 rak buku. Setiap rak berisi 15 buku. Berapa jumlah seluruh buku di perpustakaan tersebut?",
        answer: "90",
        alternatives: ["90", "sembilan puluh", "90 buku"],
        hint: "Kalikan jumlah rak dengan buku per rak",
        explanation: "6 × 15 = 90 buku"
    },
    
    // Kepingan 7
    {
        id: 7,
        pieceNumber: 7,
        question: "Rini memiliki uang 50 ribu rupiah. Dia membeli pensil seharga 7 ribu rupiah. Berapa sisa uang Rini?",
        answer: "43000",
        alternatives: ["43000", "43 ribu", "empat puluh tiga ribu", "43"],
        hint: "Kurangi uang Rini dengan harga pensil",
        explanation: "50.000 - 7.000 = 43.000 rupiah atau 43 ribu"
    },
    
    // Kepingan 8
    {
        id: 8,
        pieceNumber: 8,
        question: "Di sebuah taman ada 5 pohon bunga. Setiap pohon memiliki 18 bunga. Berapa total bunga di taman tersebut?",
        answer: "90",
        alternatives: ["90", "sembilan puluh", "90 bunga"],
        hint: "Kalikan pohon dengan bunga per pohon",
        explanation: "5 × 18 = 90 bunga"
    },
    
    // Kepingan 9
    {
        id: 9,
        pieceNumber: 9,
        question: "Sebuah sekolah memiliki 240 siswa. Jika setiap kelas berisi 30 siswa, berapa jumlah kelas yang ada di sekolah tersebut?",
        answer: "8",
        alternatives: ["8", "delapan", "8 kelas"],
        hint: "Bagi total siswa dengan siswa per kelas",
        explanation: "240 ÷ 30 = 8 kelas"
    },
    
    // Kepingan 10
    {
        id: 10,
        pieceNumber: 10,
        question: "Tomi mempunyai 45 mainan. Dia memberikan 18 mainan kepada adiknya. Berapa sisa mainan Tomi?",
        answer: "27",
        alternatives: ["27", "dua puluh tujuh", "27 mainan"],
        hint: "Kurangi mainan Tomi dengan yang diberikan",
        explanation: "45 - 18 = 27 mainan"
    },
    
    // Kepingan 11
    {
        id: 11,
        pieceNumber: 11,
        question: "Seorang pedagang menjual apel 9 keranjang. Setiap keranjang berisi 20 apel. Berapa total apel yang dijual?",
        answer: "180",
        alternatives: ["180", "seratus delapan puluh", "180 apel"],
        hint: "Kalikan keranjang dengan apel per keranjang",
        explanation: "9 × 20 = 180 apel"
    },
    
    // Kepingan 12
    {
        id: 12,
        pieceNumber: 12,
        question: "Doni memiliki 50 ribu rupiah. Ia membeli buku seharga 18 ribu rupiah dan pensil seharga 7 ribu rupiah. Berapa sisa uang Doni sekarang?",
        answer: "25000",
        alternatives: ["25000", "25 ribu", "dua puluh lima ribu", "25"],
        hint: "Hitung belanja total dulu, baru kurangi dari uang Doni",
        explanation: "18.000 + 7.000 = 25.000, kemudian 50.000 - 25.000 = 25.000 rupiah"
    },
    
    // Kepingan 13
    {
        id: 13,
        pieceNumber: 13,
        question: "Sebuah kolam ikan berisi 72 ikan. Jika setiap kantong dapat menampung 9 ikan, berapa kantong yang diperlukan untuk memindahkan semua ikan?",
        answer: "8",
        alternatives: ["8", "delapan", "8 kantong"],
        hint: "Bagi total ikan dengan ikan per kantong",
        explanation: "72 ÷ 9 = 8 kantong"
    },
    
    // Kepingan 14
    {
        id: 14,
        pieceNumber: 14,
        question: "Di sebuah kelas terdapat 12 siswa laki-laki dan 8 siswa perempuan. Berapa jumlah seluruh siswa di kelas tersebut?",
        answer: "20",
        alternatives: ["20", "dua puluh", "20 siswa"],
        hint: "Jumlahkan siswa laki-laki dan perempuan",
        explanation: "12 + 8 = 20 siswa"
    },
    
    // Kepingan 15
    {
        id: 15,
        pieceNumber: 15,
        question: "Ibu membuat 36 kue dan ingin membagikannya ke 4 anak. Berapa kue yang diterima setiap anak?",
        answer: "9",
        alternatives: ["9", "sembilan", "9 kue"],
        hint: "Bagi total kue dengan jumlah anak",
        explanation: "36 ÷ 4 = 9 kue per anak"
    },
    
    // Kepingan 16
    {
        id: 16,
        pieceNumber: 16,
        question: "Susi mempunyai 38 stiker. Dia membeli lagi 22 stiker. Berapa total stiker Susi sekarang?",
        answer: "60",
        alternatives: ["60", "enam puluh", "60 stiker"],
        hint: "Jumlahkan stiker yang dimiliki dengan yang dibeli",
        explanation: "38 + 22 = 60 stiker"
    }
];

// 6 Soal Final (muncul setelah puzzle selesai)
const FINAL_QUESTIONS = [
    {
        id: 1,
        question: "Di sebuah kelas terdapat 12 siswa laki-laki dan 8 siswa perempuan. Berapa jumlah seluruh siswa di kelas tersebut?",
        answer: "20",
        alternatives: ["20", "dua puluh", "20 siswa"],
        correctAnswer: 20
    },
    {
        id: 2,
        question: "Rina memiliki 25 permen. Ia membagikan 9 permen kepada temannya. Berapa sisa permen Rina sekarang?",
        answer: "16",
        alternatives: ["16", "enam belas", "16 permen"],
        correctAnswer: 16
    },
    {
        id: 3,
        question: "Sebuah perpustakaan memiliki 6 rak buku. Setiap rak berisi 15 buku. Berapa jumlah seluruh buku di perpustakaan tersebut?",
        answer: "90",
        alternatives: ["90", "sembilan puluh", "90 buku"],
        correctAnswer: 90
    },
    {
        id: 4,
        question: "Ayah membeli 4 kantong jeruk. Setiap kantong berisi 12 jeruk. Berapa jumlah seluruh jeruk yang dibeli ayah?",
        answer: "48",
        alternatives: ["48", "empat puluh delapan", "48 jeruk"],
        correctAnswer: 48
    },
    {
        id: 5,
        question: "Sebuah sekolah memiliki 240 siswa. Jika setiap kelas berisi 30 siswa, berapa jumlah kelas yang ada di sekolah tersebut?",
        answer: "8",
        alternatives: ["8", "delapan", "8 kelas"],
        correctAnswer: 8
    },
    {
        id: 6,
        question: "Doni memiliki 50 ribu rupiah. Ia membeli buku seharga 18 ribu rupiah dan pensil seharga 7 ribu rupiah. Berapa sisa uang Doni sekarang?",
        answer: "25000",
        alternatives: ["25000", "25 ribu", "dua puluh lima ribu", "25"],
        correctAnswer: 25000
    }
];

/**
 * Shuffle array untuk mengacak urutan soal puzzle
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get randomized puzzle sequence
 * Memastikan soal puzzle di-acak tapi tetap sesuai dengan posisi
 */
function getRandomizedPuzzleSequence() {
    const indices = Array.from({length: 16}, (_, i) => i);
    return shuffleArray(indices).map(i => PUZZLE_QUESTIONS[i]);
}

/**
 * Jarak Levenshtein untuk fuzzy matching jawaban
 */
function levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator
            );
        }
    }
    
    return track[str2.length][str1.length];
}

/**
 * Check jawaban dengan fuzzy matching
 */
function checkAnswer(userAnswer, correctAnswers) {
    const normalized = userAnswer.trim().toLowerCase();
    const normalized_no_spaces = normalized.replace(/\s+/g, '');
    
    for (const answer of correctAnswers) {
        const answerLower = answer.toLowerCase();
        const answerLower_no_spaces = answerLower.replace(/\s+/g, '');
        
        // Exact match
        if (normalized === answerLower || normalized_no_spaces === answerLower_no_spaces) {
            return true;
        }
        
        // Fuzzy match dengan threshold
        const distance = levenshteinDistance(normalized, answerLower);
        const maxLength = Math.max(normalized.length, answerLower.length);
        const similarity = 1 - (distance / maxLength);
        
        if (similarity >= 0.85) {
            return true;
        }
    }
    
    return false;
}

/**
 * Generate puzzle board slots (4x4 grid)
 */
function generatePuzzleBoard() {
    return Array.from({length: 16}, (_, i) => ({
        id: i + 1,
        filled: false,
        pieceId: null
    }));
}

/**
 * Convert text to speech menggunakan Web Speech API
 */
function speakText(text, lang = 'id-ID') {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = resolve;
        utterance.onerror = resolve;
        
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
}

/**
 * Stop speaking
 */
function stopSpeaking() {
    window.speechSynthesis.cancel();
}

/**
 * Initialize speech recognition
 */
function initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.error('Speech Recognition tidak didukung di browser ini');
        return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    return recognition;
}

/**
 * Simple confetti animation
 */
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    
    container.innerHTML = '';
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
        
        container.appendChild(confetti);
    }
}

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
