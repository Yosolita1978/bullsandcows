// Wrap everything in IIFE to prevent global scope conflicts
(function() {
    'use strict';
    
    // --- Language System ---
    const translations = {
        en: {
            gameTitle: "Bulls & Cows",
            pageTitle: "Bulls & Cows - Number Guessing Game",
            metaDescription: "Play Bulls and Cows number guessing game online. Guess the 4-digit secret number!",
            submitBtn: "Enter",
            inputPlaceholder: "Enter your guess",
            helpLink: "How to play?",
            shareTitle: "Share Your Result!",
            whatsappText: "Share on WhatsApp",
            mastodonText: "Share on Mastodon",
            copyText: "Copy to Clipboard",
            newGameText: "Start New Game",
            copiedText: "✅ Copied!",
            mastodonPrompt: "Enter your Mastodon instance (e.g., mastodon.social):",
            
            // Turn counter messages
            readyToPlay: "Get ready to play!",
            attemptOf: "Attempt {0} of 10",
            wonInAttempts: "🎉 Won in {0} attempt{1}!",
            gameOver: "💔 Game Over - 10 attempts used",
            
            // Game messages
            enterFourDigits: "Please enter a 4-digit number.",
            noDuplicates: "Please enter 4 different digits (no duplicates allowed).",
            youWin: "You win!",
            youLose: "You lose! No more attempts left.",
            
            // Feedback terms and emojis
            bullTerm: "Bulls",
            cowTerm: "Cows",
            bullEmoji: "🐂",
            cowEmoji: "🐄",
            missEmoji: "⚫",
            bullsAndCows: "Bulls: {0}, Cows: {1}",
            
            // Instructions
            instructions: [
                "Enter a 4-digit number using 4 different digits (0-9, no duplicates) in the input box.",
                "Click \"Submit\" to guess the secret number.",
                "You'll get feedback: \"bulls\" for correct digits in the right place and \"cows\" for correct digits in the wrong place.",
                "You have 10 attempts to guess the number."
            ],
            
            // Share message template
            shareWon: "🎉 I won in {0} attempt{1}!",
            shareLost: "😅 I couldn't crack the code in 10 attempts!",
            shareGameName: "Bulls & Cows {0}",
            shareBeatScore: "Can you beat my score?",
            shareDoBreater: "Can you do better?",
            sharePlayedGame: "I just played Bulls & Cows!"
        },
        es: {
            gameTitle: "Picas y Fijas",
            pageTitle: "Picas y Fijas - Juego de Adivinanza de Números",
            metaDescription: "Juega Picas y Fijas en línea. ¡Adivina el número secreto de 4 dígitos!",
            submitBtn: "Enviar",
            inputPlaceholder: "Ingresa tu número",
            helpLink: "¿Cómo jugar?",
            shareTitle: "¡Comparte tu Resultado!",
            whatsappText: "Compartir en WhatsApp",
            mastodonText: "Compartir en Mastodon",
            copyText: "Copiar al Portapapeles",
            newGameText: "Nuevo Juego",
            copiedText: "✅ ¡Copiado!",
            mastodonPrompt: "Ingresa tu instancia de Mastodon (ej., mastodon.social):",
            
            // Turn counter messages
            readyToPlay: "¡Prepárate para jugar!",
            attemptOf: "Intento {0} de 10",
            wonInAttempts: "🎉 ¡Ganaste en {0} intento{1}!",
            gameOver: "💔 Fin del Juego - 10 intentos usados",
            
            // Game messages
            enterFourDigits: "Por favor ingresa un número de 4 dígitos.",
            noDuplicates: "Por favor ingresa 4 dígitos diferentes (no se permiten duplicados).",
            youWin: "¡Ganaste!",
            youLose: "¡Perdiste! No quedan más intentos.",
            
            // Feedback terms and emojis
            bullTerm: "Fijas",
            cowTerm: "Picas",
            bullEmoji: "🐓",
            cowEmoji: "🐥",
            missEmoji: "⚫",
            bullsAndCows: "Fijas: {0}, Picas: {1}",
            
            // Instructions
            instructions: [
                "Ingresa un número de 4 dígitos usando 4 dígitos diferentes (0-9, sin duplicados) en la caja de texto.",
                "Haz clic en \"Enviar\" para adivinar el número secreto.",
                "Recibirás retroalimentación: \"fijas\" para dígitos correctos en la posición correcta y \"picas\" para dígitos correctos en la posición incorrecta.",
                "Tienes 10 intentos para adivinar el número."
            ],
            
            // Share message template
            shareWon: "🎉 ¡Gané en {0} intento{1}!",
            shareLost: "😅 ¡No pude descifrar el código en 10 intentos!",
            shareGameName: "Picas y Fijas {0}",
            shareBeatScore: "¿Puedes superar mi puntuación?",
            shareDoBreater: "¿Puedes hacerlo mejor?",
            sharePlayedGame: "¡Acabo de jugar Picas y Fijas!"
        }
    };

    // Current language state
    let currentLanguage = 'en';

    // Browser language detection
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        // console.log("Browser language detected:", browserLang);
        
        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && translations[urlLang]) {
            // console.log("Language set from URL:", urlLang);
            return urlLang;
        }
        
        // Check localStorage
        const savedLang = localStorage.getItem('bullsAndCowsLanguage');
        if (savedLang && translations[savedLang]) {
            // console.log("Language loaded from localStorage:", savedLang);
            return savedLang;
        }
        
        // Detect from browser
        if (browserLang.startsWith('es')) {
            // console.log("Spanish detected from browser");
            return 'es';
        }
        
        // console.log("Defaulting to English");
        return 'en';
    }

    // Language management functions
    function getText(key) {
        const keys = key.split('.');
        let text = translations[currentLanguage];
        
        for (const k of keys) {
            text = text[k];
            if (!text) {
                console.warn(`Translation key not found: ${key} for language: ${currentLanguage}`);
                // Fallback to English if Spanish translation missing
                if (currentLanguage !== 'en') {
                    let fallbackText = translations['en'];
                    for (const k2 of keys) {
                        fallbackText = fallbackText[k2];
                        if (!fallbackText) break;
                    }
                    if (fallbackText) {
                        console.warn(`Using English fallback for: ${key}`);
                        return fallbackText;
                    }
                }
                return key; // Return key as last resort
            }
        }
        
        return text;
    }

    function formatText(template, ...args) {
        return template.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    function updateLanguageAttributes() {
        // Update HTML lang attribute for accessibility and SEO
        const htmlRoot = document.getElementById('html-root');
        if (htmlRoot) {
            htmlRoot.lang = currentLanguage;
        }
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = getText('pageTitle');
        }
        
        // Update meta description
        const pageDescription = document.getElementById('page-description');
        if (pageDescription) {
            pageDescription.content = getText('metaDescription');
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            // console.error(`Language ${lang} not supported`);
            return;
        }
        
        currentLanguage = lang;
        localStorage.setItem('bullsAndCowsLanguage', lang);
        // console.log("Language changed to:", lang);
        
        updateAllText();
        updateLanguageButtons();
        updateLanguageAttributes();
    }

    function updateLanguageButtons() {
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById(`lang-${currentLanguage}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    function updateAllText() {
        // Update main UI elements
        const gameTitle = document.getElementById('game-title');
        const submitBtn = document.getElementById('submit-btn');
        const guessInput = document.getElementById('guess-input');
        const helpLink = document.getElementById('help-link');
        
        if (gameTitle) gameTitle.textContent = getText('gameTitle');
        if (submitBtn) submitBtn.textContent = getText('submitBtn');
        if (guessInput) guessInput.placeholder = getText('inputPlaceholder');
        if (helpLink) helpLink.textContent = getText('helpLink');
        
        // Update share section
        const shareTitle = document.getElementById('share-title');
        const whatsappText = document.getElementById('whatsapp-text');
        const mastodonText = document.getElementById('mastodon-text');
        const copyText = document.getElementById('copy-text');
        const newGameText = document.getElementById('new-game-text');
        
        if (shareTitle) shareTitle.textContent = getText('shareTitle');
        if (whatsappText) whatsappText.textContent = getText('whatsappText');
        if (mastodonText) mastodonText.textContent = getText('mastodonText');
        if (copyText) copyText.textContent = getText('copyText');
        if (newGameText) newGameText.textContent = getText('newGameText');
        
        // Update instructions
        const instructionsList = document.getElementById('instructions-list');
        if (instructionsList) {
            const instructions = getText('instructions');
            instructionsList.innerHTML = '';
            instructions.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });
        }
        
        // Update turn counter
        updateTurnCounter();
    }

    function initializeLanguage() {
        currentLanguage = detectBrowserLanguage();
        updateAllText();
        updateLanguageButtons();
        updateLanguageAttributes();
        // console.log("Game initialized with language:", currentLanguage);
    }

    // --- Game Variables ---
    const gameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let secretNumbers = [];
    let turns = 0;
    let numberBoxes = [];
    let gameEnded = false;
    let playerWon = false;
    let gameHistory = []; // Store each guess and its detailed feedback

    // Initialize secret number
    function generateSecretNumber() {
        const availableNumbers = [...gameNumbers]; // Create a copy
        secretNumbers = [];
        
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * availableNumbers.length);
            const number = availableNumbers.splice(index, 1)[0];
            secretNumbers.push(number);
        }
        console.log(secretNumbers.join(""));
    }

    // --- Helper to check for duplicate digits ---
    function hasDuplicateDigits(numberString) {
        const digits = numberString.split('');
        const uniqueDigits = new Set(digits);
        return digits.length !== uniqueDigits.size;
    }

    // --- Render hidden secret number boxes ---
    function renderSecretNumberBoxes() {
        const numberContainer = document.getElementById('number-container');
        if (!numberContainer) return;
        
        numberContainer.innerHTML = ''; // Clear existing boxes
        numberBoxes = []; // Reset array
        
        secretNumbers.forEach(() => {
            const box = document.createElement('div');
            box.className = 'number-box';
            box.textContent = '*';
            numberContainer.appendChild(box);
            numberBoxes.push(box);
        });
    }

    // --- Update turn counter ---
    function updateTurnCounter() {
        const turnCounter = document.getElementById('turn-counter');
        if (!turnCounter) return;
        
        if (turns === 0) {
            turnCounter.textContent = getText('readyToPlay');
        } else if (!gameEnded) {
            turnCounter.textContent = formatText(getText('attemptOf'), turns);
        } else if (playerWon) {
            const pluralS = turns === 1 ? '' : 's';
            turnCounter.textContent = formatText(getText('wonInAttempts'), turns, pluralS);
        } else {
            turnCounter.textContent = getText('gameOver');
        }
    }

    // --- Enhanced feedback analysis for sharing ---
    function checkDetailedFeedback(secret, input) {
        const feedback = [];
        const secretArr = secret.split('');
        const inputArr = input.split('');
        const usedSecretIndices = new Set();
        const usedInputIndices = new Set();
        
        // First pass: find bulls (correct position)
        for (let i = 0; i < inputArr.length; i++) {
            if (secretArr[i] === inputArr[i]) {
                feedback[i] = 'bull';
                usedSecretIndices.add(i);
                usedInputIndices.add(i);
            }
        }
        
        // Second pass: find cows (correct digit, wrong position)
        for (let i = 0; i < inputArr.length; i++) {
            if (!usedInputIndices.has(i)) {
                for (let j = 0; j < secretArr.length; j++) {
                    if (!usedSecretIndices.has(j) && secretArr[j] === inputArr[i]) {
                        feedback[i] = 'cow';
                        usedSecretIndices.add(j);
                        usedInputIndices.add(i);
                        break;
                    }
                }
            }
        }
        
        // Third pass: mark remaining as misses
        for (let i = 0; i < inputArr.length; i++) {
            if (!feedback[i]) {
                feedback[i] = 'miss';
            }
        }
        
        return feedback;
    }

    // --- Bulls helper ---
    function checkBulls(secret, input) {
        let bulls = 0;
        for (let i = 0; i < secret.length; i++) {
            if (secret[i] === input[i]) bulls++;
        }
        return bulls;
    }

    // --- Cows helper ---
    function checkCows(secret, input) {
        let cows = 0;
        const tempSecret = [...secret];
        for (let i = 0; i < input.length; i++) {
            const idx = tempSecret.indexOf(input[i]);
            if (idx > -1 && idx !== i) {
                cows++;
                tempSecret[idx] = null;
            }
        }
        return cows;
    }

    // --- Generate emoji grid from game history ---
    function generateEmojiGrid() {
        let grid = '';
        
        gameHistory.forEach(entry => {
            let row = '';
            entry.feedback.forEach(result => {
                switch(result) {
                    case 'bull':
                        row += getText('bullEmoji');
                        break;
                    case 'cow':
                        row += getText('cowEmoji');
                        break;
                    case 'miss':
                        row += getText('missEmoji');
                        break;
                }
            });
            grid += row + '\n';
        });
        
        return grid.trim();
    }

    // --- Share functionality ---
    function generateShareMessage() {
        const grid = generateEmojiGrid();
        const attemptsText = playerWon ? `${turns}/10` : 'X/10';
        
        let message = formatText(getText('sharePlayedGame')) + '\n\n';
        
        if (playerWon) {
            const pluralS = turns === 1 ? '' : 's';
            message += formatText(getText('shareWon'), turns, pluralS) + '\n\n';
        } else {
            message += getText('shareLost') + '\n\n';
        }
        
        message += formatText(getText('shareGameName'), attemptsText) + '\n\n';
        message += grid + '\n\n';
        
        if (playerWon) {
            message += getText('shareBeatScore') + '\n\n';
        } else {
            message += getText('shareDoBreater') + '\n\n';
        }
        
        message += 'https://bulls.yosola.co';
        
        return message;
    }

    function showShareOptions() {
        const shareContainer = document.getElementById('share-container');
        const newGameContainer = document.getElementById('new-game-container');
        if (shareContainer) shareContainer.style.display = 'block';
        if (newGameContainer) newGameContainer.style.display = 'block';
    }

    // --- Auto-scroll to bottom of game container ---
    function scrollToLatestGuess() {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.scrollTop = gameContainer.scrollHeight;
        }
    }

    // --- Start a new game ---
    function startNewGame() {
        // Reset game state
        turns = 0;
        gameEnded = false;
        playerWon = false;
        gameHistory = [];
        
        // Generate new secret number
        generateSecretNumber();
        
        // Reset UI
        const input = document.getElementById('guess-input');
        const message = document.getElementById('message');
        const gameContainer = document.getElementById('game-container');
        const shareContainer = document.getElementById('share-container');
        const newGameContainer = document.getElementById('new-game-container');
        
        if (input) {
            input.value = '';
            input.disabled = false;
        }
        
        if (message) {
            message.textContent = '';
            message.className = 'message';
        }
        
        if (gameContainer) {
            gameContainer.innerHTML = '';
        }
        
        if (shareContainer) shareContainer.style.display = 'none';
        if (newGameContainer) newGameContainer.style.display = 'none';
        
        // Reset secret number boxes
        numberBoxes.forEach((box, i) => {
            box.textContent = '*';
            box.className = 'number-box';
            box.style.backgroundColor = '';
        });
        
        // Reset turn counter
        updateTurnCounter();
        
        // console.log("New game started");
    }

    // --- Copy share message to clipboard ---
    async function copyToClipboard() {
        try {
            const shareText = generateShareMessage();
            await navigator.clipboard.writeText(shareText);
            
            // Provide feedback
            const copyBtn = document.getElementById('copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `📋 <span>${getText('copiedText')}</span>`;
                copyBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.backgroundColor = '#6c757d';
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            // Fallback for older browsers
            const shareText = generateShareMessage();
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Provide feedback
            const copyBtn = document.getElementById('copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `📋 <span>${getText('copiedText')}</span>`;
                copyBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.backgroundColor = '#6c757d';
                }, 2000);
            }
        }
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        // Limit input to 4 digits
        const guessInput = document.getElementById('guess-input');
        if (guessInput) {
            guessInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
            });
        }

        // Form submission logic
        const guessForm = document.getElementById('guess-form');
        if (guessForm) {
            guessForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const input = document.getElementById('guess-input');
                const message = document.getElementById('message');
                if (!input || !message) return;
                
                const guess = input.value.trim();

                // Clear message on every submit
                message.textContent = "";
                message.className = "message";

                if (guess.length !== 4) {
                    message.textContent = getText('enterFourDigits');
                    message.classList.add("error");
                    return;
                }
                
                // Check for duplicate digits
                if (hasDuplicateDigits(guess)) {
                    message.textContent = getText('noDuplicates');
                    message.classList.add("error");
                    return;
                }

                const guessArr = guess.split('');
                const secretStr = secretNumbers.join('');

                turns++;
                updateTurnCounter();
                
                // console.log(`Turn ${turns}: Player guessed ${guess}, secret is ${secretStr}`);

                // Get detailed feedback for sharing
                const detailedFeedback = checkDetailedFeedback(secretStr, guess);
                
                // Calculate bulls and cows for display
                const bulls = checkBulls(secretStr, guess);
                const cows = checkCows(secretStr, guess);

                // Store this guess in game history for sharing
                gameHistory.push({
                    guess: guess,
                    feedback: detailedFeedback,
                    bulls: bulls,
                    cows: cows,
                    turn: turns
                });

                // Winning condition
                if (guess === secretStr) {
                    input.disabled = true;
                    gameEnded = true;
                    playerWon = true;
                    
                    numberBoxes.forEach((box, i) => {
                        box.textContent = secretNumbers[i];
                        box.classList.add('winning-number');
                    });
                    message.textContent = getText('youWin');
                    message.classList.add("success");
                    
                    updateTurnCounter();
                    
                    // console.log(`Player won in ${turns} attempts!`);
                    
                    // Show share options
                    setTimeout(() => {
                        showShareOptions();
                    }, 1000);
                }

                if (turns >= 10 && guess !== secretStr) {
                    gameEnded = true;
                    playerWon = false;
                    
                    message.textContent = getText('youLose');
                    message.classList.add("error");
                    input.disabled = true;
                    
                    // Reveal the secret number
                    numberBoxes.forEach((box, i) => {
                        box.textContent = secretNumbers[i];
                        box.style.backgroundColor = '#FE938C';
                    });
                    
                    updateTurnCounter();
                    
                    // console.log(`Player lost. Secret was: ${secretStr}`);
                    
                    // Show share options
                    setTimeout(() => {
                        showShareOptions();
                    }, 1000);
                }

                // Create guess row with feedback
                const gameContainer = document.getElementById('game-container');
                if (gameContainer) {
                    const guessBlock = document.createElement('div');
                    guessBlock.className = 'guess-block';

                    const guessRow = document.createElement('div');
                    guessRow.className = 'guess-row';

                    guessArr.forEach(digit => {
                        const box = document.createElement('div');
                        box.className = 'number-box';
                        box.textContent = digit;
                        guessRow.appendChild(box);
                    });

                    const feedback = document.createElement('div');
                    feedback.className = 'feedback-block';
                    feedback.textContent = formatText(getText('bullsAndCows'), bulls, cows);

                    guessBlock.appendChild(guessRow);
                    guessBlock.appendChild(feedback);
                    gameContainer.appendChild(guessBlock);

                    // Auto-scroll to show the latest guess
                    setTimeout(() => {
                        scrollToLatestGuess();
                    }, 100);
                }

                input.value = '';
            });
        }

        // Toggle help instructions
        const helpLink = document.getElementById('help-link');
        if (helpLink) {
            helpLink.addEventListener('click', function (e) {
                e.preventDefault();
                const instructions = document.querySelector('.instructions-back');
                if (instructions) {
                    instructions.style.display = instructions.style.display === 'block' ? 'none' : 'block';
                }
            });
        }

        // Share functionality event listeners
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                const shareText = generateShareMessage();
                const encodedText = encodeURIComponent(shareText);
                
                const whatsappUrl = `https://wa.me/?text=${encodedText}`;
                window.open(whatsappUrl, '_blank');
            });
        }

        const mastodonBtn = document.getElementById('mastodon-btn');
        if (mastodonBtn) {
            mastodonBtn.addEventListener('click', () => {
                const shareText = generateShareMessage();
                const encodedText = encodeURIComponent(shareText);
                
                // Prompt user for their Mastodon instance with translated text
                const instance = prompt(getText('mastodonPrompt')) || 'mastodon.social';
                const cleanInstance = instance.replace(/^https?:\/\//, '').replace(/\/$/, '');
                
                const mastodonUrl = `https://${cleanInstance}/share?text=${encodedText}`;
                window.open(mastodonUrl, '_blank');
            });
        }

        // Language toggle event listeners
        const langEnBtn = document.getElementById('lang-en');
        const langEsBtn = document.getElementById('lang-es');
        
        if (langEnBtn) {
            langEnBtn.addEventListener('click', () => {
                setLanguage('en');
                startNewGame();
            });
        }
        
        if (langEsBtn) {
            langEsBtn.addEventListener('click', () => {
                setLanguage('es');
                startNewGame();
            });
        }

        // Copy and New Game event listeners
        const copyBtn = document.getElementById('copy-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', copyToClipboard);
        }
        
        if (newGameBtn) {
            newGameBtn.addEventListener('click', startNewGame);
        }
    }

    // --- Initialize game on page load ---
    function initializeGame() {
        // console.log("Game initializing...");
        
        // Initialize language system
        initializeLanguage();
        
        // Generate secret number and render boxes
        generateSecretNumber();
        renderSecretNumberBoxes();
        
        // Update turn counter
        updateTurnCounter();
        
        // Setup all event listeners
        setupEventListeners();
        
        // Check if specific language was requested via URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && translations[urlLang] && urlLang !== currentLanguage) {
            // console.log("URL language parameter detected:", urlLang);
            setLanguage(urlLang);
        }
        
        // console.log("Game initialization complete");
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
    } else {
        initializeGame();
    }

})();