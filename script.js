/**
 * Smart Inclusive Puzzle (SIP)
 * Main Application Script
 */

// ========================================
// GLOBAL VARIABLES
// ========================================

let currentState = 'welcome';
let microphoneEnabled = false;
let speechRecognition = null;
let isListening = false;
let currentQuestion = null;
let currentQuestionIndex = 0;
let puzzleSequence = [];
let puzzleBoard = [];
let puzzleSolvedPositions = new Set();
let currentAnswerAttempt = 0;
let finalQuestionsAnswers = {};
let totalCorrectAnswers = 0;

// Drag and drop variables
let draggedElement = null;
let dragOffset = { x: 0, y: 0 };

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Smart Inclusive Puzzle initialized');
    speechRecognition = initializeSpeechRecognition();
    setupEventListeners();
    setupVoiceCommands();
    greetUser();
});

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    // Welcome screen
    document.getElementById('startBtn').addEventListener('click', goToPermissionScreen);
    
    // Permission screen
    document.getElementById('allowMicBtn').addEventListener('click', allowMicrophone);
    document.getElementById('denyMicBtn').addEventListener('click', denyMicrophone);
    
    // Game screen
    document.getElementById('resetBtn').addEventListener('click', confirmReset);
    document.getElementById('speakBtn').addEventListener('click', repeatQuestion);
    document.getElementById('submitAnswerBtn').addEventListener('click', submitAnswer);
    document.getElementById('startListeningBtn').addEventListener('click', startListeningForAnswer);
    document.getElementById('skipPieceBtn').addEventListener('click', skipCurrentPiece);
    document.getElementById('proceedToFinalBtn').addEventListener('click', goToFinalScreen);
    
    // Final screen
    document.getElementById('showResultsBtn').addEventListener('click', showFinalResults);
    document.getElementById('restartBtn').addEventListener('click', resetGame);
    
    // Completion screen
    document.getElementById('restartCompletionBtn').addEventListener('click', resetGame);
    document.getElementById('shareBtn').addEventListener('click', shareResults);
    
    // Answer input
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
}

// ========================================
// VOICE COMMANDS SETUP
// ========================================

function setupVoiceCommands() {
    if (!speechRecognition) return;
    
    speechRecognition.onstart = () => {
        isListening = true;
        document.getElementById('voiceIndicator').style.display = 'flex';
    };
    
    speechRecognition.onend = () => {
        isListening = false;
        document.getElementById('voiceIndicator').style.display = 'none';
    };
    
    speechRecognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
        }
        
        handleVoiceInput(transcript.trim().toLowerCase());
    };
    
    speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        showNotification('Maaf, terjadi masalah saat mendengarkan suara Anda', 'error');
    };
}

// ========================================
// SCREEN NAVIGATION
// ========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goToPermissionScreen() {
    stopSpeaking();
    showScreen('permissionScreen');
    speakText('Kami membutuhkan izin untuk mengakses microphone Anda. Anda bisa memilih izinkan atau lanjut tanpa microphone.');
}

function allowMicrophone() {
    if (!speechRecognition) {
        showNotification('Speech Recognition tidak didukung di browser Anda', 'warning');
        initializeGame();
        return;
    }
    
    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            microphoneEnabled = true;
            console.log('Microphone enabled');
            showNotification('✅ Microphone berhasil diizinkan!', 'success');
            initializeGame();
        })
        .catch((error) => {
            console.error('Microphone permission denied:', error);
            showNotification('Izin microphone ditolak. Melanjutkan tanpa suara...', 'warning');
            microphoneEnabled = false;
            initializeGame();
        });
}

function denyMicrophone() {
    microphoneEnabled = false;
    console.log('Microphone disabled by user');
    showNotification('Melanjutkan tanpa fitur suara', 'info');
    initializeGame();
}

function initializeGame() {
    showScreen('gameScreen');
    setupPuzzle();
    startPuzzleGame();
}

// ========================================
// GREETING
// ========================================

function greetUser() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Selamat pagi! ☀️ ';
    } else if (hour < 18) {
        greeting = 'Selamat siang! 🌤️ ';
    } else {
        greeting = 'Selamat malam! 🌙 ';
    }
    
    const message = greeting + 'Selamat datang di Smart Inclusive Puzzle. Saya siap membantu Anda menyelesaikan puzzle yang menyenangkan dengan soal-soal matematika. Mari mulai!';
    
    speakText(message);
    updateAIMessage(message);
}

// ========================================
// PUZZLE SETUP
// ========================================

function setupPuzzle() {
    // Get randomized sequence
    puzzleSequence = getRandomizedPuzzleSequence();
    
    // Initialize puzzle board
    puzzleBoard = generatePuzzleBoard();
    puzzleSolvedPositions = new Set();
    
    // Generate puzzle board slots
    const boardContainer = document.getElementById('puzzleBoard');
    boardContainer.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        slot.id = `slot-${i}`;
        slot.dataset.position = i;
        slot.innerHTML = `<span class="piece-number">${i + 1}</span>`;
        slot.addEventListener('click', () => handleSlotClick(i));
        boardContainer.appendChild(slot);
    }
    
    // Generate puzzle pieces
    generatePuzzlePieces();
}

function generatePuzzlePieces() {
    const piecesContainer = document.getElementById('puzzlePieces');
    piecesContainer.innerHTML = '';
    
    PUZZLE_QUESTIONS.forEach((q) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.id = `piece-${q.pieceNumber}`;
        piece.dataset.pieceNumber = q.pieceNumber;
        piece.innerHTML = `
            <div class="piece-icon">🧩</div>
            <div class="piece-label">Kepingan #${q.pieceNumber}</div>
            <div class="piece-question">${truncateText(q.question, 20)}</div>
        `;
        
        piece.addEventListener('click', () => handlePieceClick(q.pieceNumber));
        piece.addEventListener('touchstart', (e) => handlePieceTouchStart(e, q.pieceNumber));
        piece.addEventListener('touchmove', handlePieceTouchMove);
        piece.addEventListener('touchend', handlePieceTouchEnd);
        
        piecesContainer.appendChild(piece);
    });
}

// ========================================
// PUZZLE GAME FLOW
// ========================================

function startPuzzleGame() {
    currentQuestionIndex = 0;
    presentNextQuestion();
}

function presentNextQuestion() {
    if (currentQuestionIndex >= puzzleSequence.length) {
        completePuzzle();
        return;
    }
    
    currentQuestion = puzzleSequence[currentQuestionIndex];
    currentAnswerAttempt = 0;
    
    showAnswerSection();
    updateLevelInfo();
    updateProgressBar();
    
    const message = `Pertanyaan untuk kepingan nomor ${currentQuestion.pieceNumber}:\n\n${currentQuestion.question}`;
    updateAIMessage(message);
    
    speakText(message);
}

function handlePieceClick(pieceNumber) {
    if (currentQuestion && currentQuestion.pieceNumber === pieceNumber) {
        const message = `Bagus! Anda memilih kepingan yang benar. Sekarang jawab pertanyaannya.`;
        showNotification(message, 'success');
        speakText(message);
    } else {
        const message = `Itu bukan kepingan yang sedang ditanyakan. Coba lagi!`;
        showNotification(message, 'warning');
        speakText(message);
    }
}

function handleSlotClick(position) {
    const slot = document.getElementById(`slot-${position}`);
    
    if (slot.classList.contains('filled')) {
        showNotification('Slot ini sudah terisi', 'info');
        return;
    }
    
    showNotification('Jawab pertanyaan terlebih dahulu untuk mengisi slot ini', 'info');
}

function submitAnswer() {
    const answerInput = document.getElementById('answerInput');
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        showNotification('Silakan ketik atau ucapkan jawaban Anda', 'warning');
        speakText('Silakan ketik atau ucapkan jawaban Anda');
        return;
    }
    
    checkAnswerUser(userAnswer);
}

function checkAnswerUser(userAnswer) {
    const isCorrect = window.checkAnswer(userAnswer, currentQuestion.alternatives);
    const answerInput = document.getElementById('answerInput');
    
    answerInput.value = '';
    currentAnswerAttempt++;
    
    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

function handleCorrectAnswer() {
    totalCorrectAnswers++;
    
    const message = `🎉 Jawaban benar! Selamat! Kepingan nomor ${currentQuestion.pieceNumber} sudah bisa diletakkan di papan puzzle.`;
    updateAIMessage(message);
    showNotification(message, 'success');
    speakText(message);
    
    // Move piece to board
    setTimeout(() => {
        placePieceOnBoard(currentQuestion.pieceNumber);
        currentQuestionIndex++;
        presentNextQuestion();
    }, 2000);
}

function handleWrongAnswer() {
    const attempts = currentAnswerAttempt;
    const maxAttempts = 3;
    
    if (attempts >= maxAttempts) {
        const message = `Maaf, jawaban Anda masih belum benar. Petunjuk: ${currentQuestion.hint}. Coba lagi!`;
        updateAIMessage(message);
        showNotification('Coba lagi dengan lebih cermat', 'error');
        speakText(message);
    } else {
        const remaining = maxAttempts - attempts;
        const message = `Jawaban belum benar. Anda masih punya ${remaining} kesempatan lagi. Coba lagi!`;
        updateAIMessage(message);
        showNotification(message, 'warning');
        speakText(message);
    }
    
    document.getElementById('answerInput').focus();
}

function placePieceOnBoard(pieceNumber) {
    const position = pieceNumber - 1;
    const slot = document.getElementById(`slot-${position}`);
    const piece = document.getElementById(`piece-${pieceNumber}`);
    
    // Create image reference (would use actual puzzle image in production)
    slot.innerHTML = `<div style="text-align: center; font-size: 24px;">✓</div><span class="piece-number">${pieceNumber}</span>`;
    slot.classList.add('filled');
    piece.classList.add('used');
    
    puzzleSolvedPositions.add(position);
}

function skipCurrentPiece() {
    const message = `Baiklah, lewati kepingan ini. Soal berikutnya...`;
    updateAIMessage(message);
    speakText(message);
    
    currentQuestionIndex++;
    presentNextQuestion();
}

// ========================================
// VOICE INPUT HANDLING
// ========================================

function startListeningForAnswer() {
    if (!microphoneEnabled || !speechRecognition) {
        showNotification('Microphone tidak aktif. Silakan ketik jawaban Anda.', 'warning');
        return;
    }
    
    try {
        speechRecognition.start();
        showNotification('🎤 Saya mendengarkan... Ucapkan jawaban Anda', 'info');
    } catch (error) {
        console.error('Error starting speech recognition:', error);
    }
}

function handleVoiceInput(transcript) {
    // Check for voice commands
    if (transcript.includes('mulai')) {
        goToPermissionScreen();
        return;
    }
    if (transcript.includes('kirim') || transcript.includes('submit')) {
        submitAnswer();
        return;
    }
    if (transcript.includes('lewati') || transcript.includes('skip')) {
        skipCurrentPiece();
        return;
    }
    if (transcript.includes('reset') || transcript.includes('ulang')) {
        confirmReset();
        return;
    }
    
    // If in game, treat as answer
    if (currentState === 'game' && currentQuestion) {
        document.getElementById('answerInput').value = transcript;
        showNotification(`Anda berkata: "${transcript}"`, 'info');
    }
}

// ========================================
// FINAL SCREEN HANDLING
// ========================================

function completePuzzle() {
    hideAnswerSection();
    showResultsSection();
    
    const message = `🎉 Selamat! Anda telah menyelesaikan puzzle dengan benar! ${puzzleSolvedPositions.size} dari 16 kepingan sudah terpasang. Sekarang mari lanjut ke 6 soal akhir yang telah disiapkan.`;
    updateAIMessage(message);
    speakText(message);
}

function goToFinalScreen() {
    showScreen('finalScreen');
    renderFinalQuestions();
    
    const message = `Sekarang giliran 6 soal akhir. Jawab setiap soal dengan benar. Anda bisa mengetik jawaban Anda. Mari kita mulai!`;
    updateAIMessage(message);
    speakText(message);
}

function renderFinalQuestions() {
    const container = document.getElementById('finalQuestionsContainer');
    container.innerHTML = '';
    
    FINAL_QUESTIONS.forEach((q) => {
        const card = document.createElement('div');
        card.className = 'final-question-card';
        card.id = `final-q-${q.id}`;
        
        const answered = finalQuestionsAnswers[q.id];
        if (answered) {
            card.classList.add('answered');
        }
        
        card.innerHTML = `
            <div class="final-question-number">Soal #${q.id}</div>
            <div class="final-question-text">${q.question}</div>
            <input 
                type="text" 
                class="final-question-input" 
                placeholder="Ketik jawaban Anda" 
                data-question-id="${q.id}"
                ${answered ? 'disabled' : ''}
                value="${answered ? finalQuestionsAnswers[q.id] : ''}"
            >
            <button class="btn btn-small btn-primary" onclick="submitFinalQuestion(${q.id})">
                Kirim
            </button>
        `;
        
        container.appendChild(card);
    });
}

function submitFinalQuestion(questionId) {
    const input = document.querySelector(`input[data-question-id="${questionId}"]`);
    const answer = input.value.trim();
    
    if (!answer) {
        showNotification('Silakan ketik jawaban Anda', 'warning');
        return;
    }
    
    const question = FINAL_QUESTIONS.find(q => q.id === questionId);
    const isCorrect = window.checkAnswer(answer, question.alternatives);
    
    if (isCorrect) {
        finalQuestionsAnswers[questionId] = answer;
        input.disabled = true;
        document.getElementById(`final-q-${questionId}`).classList.add('answered');
        showNotification(`✅ Jawaban soal #${questionId} benar!`, 'success');
        speakText(`Jawaban benar!`);
    } else {
        showNotification(`❌ Jawaban soal #${questionId} belum benar. Coba lagi!`, 'error');
        speakText(`Jawaban belum benar. Coba lagi!`);
    }
}

function showFinalResults() {
    const answeredCount = Object.keys(finalQuestionsAnswers).length;
    
    if (answeredCount < FINAL_QUESTIONS.length) {
        showNotification('Silakan jawab semua 6 soal terlebih dahulu', 'warning');
        return;
    }
    
    showCompletionScreen();
}

// ========================================
// COMPLETION SCREEN
// ========================================

function showCompletionScreen() {
    showScreen('completionScreen');
    createConfetti();
    
    const stats = `
    <div class="stat-item">
        <div class="stat-value">${puzzleSolvedPositions.size}</div>
        <div class="stat-label">Puzzle Selesai</div>
    </div>
    <div class="stat-item">
        <div class="stat-value">16</div>
        <div class="stat-label">Target</div>
    </div>
    <div class="stat-item">
        <div class="stat-value">${Object.keys(finalQuestionsAnswers).length}</div>
        <div class="stat-label">Soal Final</div>
    </div>
    <div class="stat-item">
        <div class="stat-value">6</div>
        <div class="stat-label">Target</div>
    </div>
    `;
    
    document.getElementById('completionStats').innerHTML = stats;
    
    const message = `🌟 Luar biasa! Anda telah menyelesaikan Smart Inclusive Puzzle dengan sempurna! Anda berhasil menjawab semua pertanyaan dengan benar. Terus tingkatkan kemampuan matematika Anda!`;
    updateAIMessage(message);
    speakText(message);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function updateAIMessage(message) {
    const aiMessage = document.getElementById('aiMessage');
    aiMessage.textContent = message;
}

function showAnswerSection() {
    document.getElementById('answerSection').style.display = 'block';
    document.getElementById('answerInput').focus();
}

function hideAnswerSection() {
    document.getElementById('answerSection').style.display = 'none';
}

function showResultsSection() {
    document.getElementById('resultsSection').style.display = 'block';
}

function hideResultsSection() {
    document.getElementById('resultsSection').style.display = 'none';
}

function updateLevelInfo() {
    const current = currentQuestionIndex + 1;
    const total = puzzleSequence.length;
    document.getElementById('currentPiece').textContent = `${current}/${total}`;
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / puzzleSequence.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function repeatQuestion() {
    if (currentQuestion) {
        const message = `${currentQuestion.question}`;
        speakText(message);
    }
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

function showNotification(message, type = 'info') {
    console.log(`[${type}] ${message}`);
    
    // Optional: Show visual notification
    const notifications = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    
    console.log(notifications[type] + ' ' + message);
}

function confirmReset() {
    const confirmed = confirm('Apakah Anda yakin ingin mengulang permainan dari awal?');
    if (confirmed) {
        resetGame();
    }
}

function resetGame() {
    // Reset variables
    currentQuestionIndex = 0;
    currentAnswerAttempt = 0;
    puzzleSolvedPositions = new Set();
    finalQuestionsAnswers = {};
    totalCorrectAnswers = 0;
    
    // Clear inputs
    document.getElementById('answerInput').value = '';
    
    // Reset UI
    hideAnswerSection();
    hideResultsSection();
    
    // Restart
    showScreen('gameScreen');
    setupPuzzle();
    startPuzzleGame();
    
    const message = 'Permainan direset. Mari kita mulai dari awal!';
    updateAIMessage(message);
    speakText(message);
}

function shareResults() {
    const text = `🎉 Saya telah menyelesaikan Smart Inclusive Puzzle! Saya berhasil menjawab ${puzzleSolvedPositions.size} soal puzzle dan ${Object.keys(finalQuestionsAnswers).length} soal final dengan benar!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Smart Inclusive Puzzle',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text);
        showNotification('Hasil disalin ke clipboard', 'success');
        speakText('Hasil Anda telah disalin ke papan klip');
    }
}

// ========================================
// DRAG AND DROP (Optional enhancement)
// ========================================

function handlePieceTouchStart(e, pieceNumber) {
    draggedElement = e.currentTarget;
    e.currentTarget.style.opacity = '0.7';
}

function handlePieceTouchMove(e) {
    // Optional: Add visual feedback
}

function handlePieceTouchEnd(e) {
    if (draggedElement) {
        draggedElement.style.opacity = '1';
        draggedElement = null;
    }
}

// ========================================
// WINDOW EVENTS
// ========================================

window.addEventListener('beforeunload', (e) => {
    if (currentQuestionIndex > 0 && currentQuestionIndex < puzzleSequence.length) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Handle page visibility for speech
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSpeaking();
    }
});
