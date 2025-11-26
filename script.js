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
            
            // Install translations
            installBannerText: "📲 Play offline! Install this app",
            installBannerBtn: "Install",
            iosInstallInstructions: "To install: tap the Share button, then 'Add to Home Screen'",
            
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
            
            // Install translations
            installBannerText: "📲 ¡Juega sin internet! Instala la app",
            installBannerBtn: "Instalar",
            iosInstallInstructions: "Para instalar: toca Compartir, luego 'Añadir a la pantalla de inicio'",
            
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
        
        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && translations[urlLang]) {
            return urlLang;
        }
        
        // Check localStorage
        const savedLang = localStorage.getItem('bullsAndCowsLanguage');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
        
        // Detect from browser
        if (browserLang.startsWith('es')) {
            return 'es';
        }
        
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
                if (currentLanguage !== 'en') {
                    let fallbackText = translations['en'];
                    for (const k2 of keys) {
                        fallbackText = fallbackText[k2];
                        if (!fallbackText) break;
                    }
                    if (fallbackText) {
                        return fallbackText;
                    }
                }
                return key;
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
        const htmlRoot = document.getElementById('html-root');
        if (htmlRoot) {
            htmlRoot.lang = currentLanguage;
        }
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = getText('pageTitle');
        }
        
        const pageDescription = document.getElementById('page-description');
        if (pageDescription) {
            pageDescription.content = getText('metaDescription');
        }
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            return;
        }
        
        currentLanguage = lang;
        localStorage.setItem('bullsAndCowsLanguage', lang);
        
        updateAllText();
        updateLanguageButtons();
        updateLanguageAttributes();
    }

    function updateLanguageButtons() {
        // Only remove active from language buttons, not install icon
        const langEn = document.getElementById('lang-en');
        const langEs = document.getElementById('lang-es');
        if (langEn) langEn.classList.remove('active');
        if (langEs) langEs.classList.remove('active');
        
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
        
        // Update install banner text
        const installBannerText = document.getElementById('install-banner-text');
        const installBannerBtn = document.getElementById('install-banner-btn');
        
        if (installBannerText) installBannerText.textContent = getText('installBannerText');
        if (installBannerBtn) installBannerBtn.textContent = getText('installBannerBtn');
        
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
        
        updateTurnCounter();
    }

    function initializeLanguage() {
        currentLanguage = detectBrowserLanguage();
        updateAllText();
        updateLanguageButtons();
        updateLanguageAttributes();
    }

    // --- PWA Install System ---
    let deferredPrompt = null;
    
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    
    function isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone === true;
    }
    
    function showInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner && !isStandalone()) {
            banner.style.display = 'flex';
        }
    }
    
    function hideInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    // function hideInstallIcon() {
    //     const icon = document.getElementById('install-icon');
    //     if (icon) {
    //         icon.style.display = 'none';
    //     }
    // }
    
    function hideAllInstallUI() {
        hideInstallBanner();
        hideInstallIcon();
    }
    
    // Track event in Plausible
    function trackEvent(eventName) {
        if (window.plausible) {
            window.plausible(eventName);
        }
    }
    
    async function triggerInstall() {
        // Track install button click
        trackEvent('Install Button Click');
        
        if (isIOS()) {
            alert(getText('iosInstallInstructions'));
            return;
        }
        
        if (!deferredPrompt) {
            // PWA not ready, show manual instructions
            alert(getText('iosInstallInstructions'));
            return;
        }
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            hideAllInstallUI();
        }
        
        deferredPrompt = null;
    }
    
    function dismissInstallBanner() {
        hideInstallBanner();
    }
    
    function setupPWAInstall() {
        // Capture the install prompt (Android/Chrome)
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstallBanner();
        });
        
        // Handle successful install - track in Plausible
        window.addEventListener('appinstalled', () => {
            hideAllInstallUI();
            deferredPrompt = null;
            
            // Track successful install in Plausible
            trackEvent('PWA Install');
        });
        
        // If already installed as standalone, hide install UI
        if (isStandalone()) {
            hideAllInstallUI();
        }
        
        // Install banner button
        const installBannerBtn = document.getElementById('install-banner-btn');
        if (installBannerBtn) {
            installBannerBtn.addEventListener('click', triggerInstall);
        }
        
        // Install banner dismiss
        const installBannerDismiss = document.getElementById('install-banner-dismiss');
        if (installBannerDismiss) {
            installBannerDismiss.addEventListener('click', dismissInstallBanner);
        }
        
        // Install icon in header (always visible)
        const installIcon = document.getElementById('install-icon');
        if (installIcon) {
            installIcon.addEventListener('click', triggerInstall);
        }
        
        // Show banner for iOS users too
        if (isIOS() && !isStandalone()) {
            showInstallBanner();
        }
    }

    // --- Game Variables ---
    const gameNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let secretNumbers = [];
    let turns = 0;
    let numberBoxes = [];
    let gameEnded = false;
    let playerWon = false;
    let gameHistory = [];

    function generateSecretNumber() {
        const availableNumbers = [...gameNumbers];
        secretNumbers = [];
        
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * availableNumbers.length);
            const number = availableNumbers.splice(index, 1)[0];
            secretNumbers.push(number);
        }
        console.log(secretNumbers.join(""));
    }

    function hasDuplicateDigits(numberString) {
        const digits = numberString.split('');
        const uniqueDigits = new Set(digits);
        return digits.length !== uniqueDigits.size;
    }

    function renderSecretNumberBoxes() {
        const numberContainer = document.getElementById('number-container');
        if (!numberContainer) return;
        
        numberContainer.innerHTML = '';
        numberBoxes = [];
        
        secretNumbers.forEach(() => {
            const box = document.createElement('div');
            box.className = 'number-box';
            box.textContent = '*';
            numberContainer.appendChild(box);
            numberBoxes.push(box);
        });
    }

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

    function checkDetailedFeedback(secret, input) {
        const feedback = [];
        const secretArr = secret.split('');
        const inputArr = input.split('');
        const usedSecretIndices = new Set();
        const usedInputIndices = new Set();
        
        for (let i = 0; i < inputArr.length; i++) {
            if (secretArr[i] === inputArr[i]) {
                feedback[i] = 'bull';
                usedSecretIndices.add(i);
                usedInputIndices.add(i);
            }
        }
        
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
        
        for (let i = 0; i < inputArr.length; i++) {
            if (!feedback[i]) {
                feedback[i] = 'miss';
            }
        }
        
        return feedback;
    }

    function checkBulls(secret, input) {
        let bulls = 0;
        for (let i = 0; i < secret.length; i++) {
            if (secret[i] === input[i]) bulls++;
        }
        return bulls;
    }

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

    function scrollToLatestGuess() {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.scrollTop = gameContainer.scrollHeight;
        }
    }

    function startNewGame() {
        turns = 0;
        gameEnded = false;
        playerWon = false;
        gameHistory = [];
        
        generateSecretNumber();
        
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
        
        numberBoxes.forEach((box, i) => {
            box.textContent = '*';
            box.className = 'number-box';
            box.style.backgroundColor = '';
        });
        
        updateTurnCounter();
    }

    async function copyToClipboard() {
        try {
            const shareText = generateShareMessage();
            await navigator.clipboard.writeText(shareText);
            
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
            const shareText = generateShareMessage();
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
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

    function setupEventListeners() {
        const guessInput = document.getElementById('guess-input');
        if (guessInput) {
            guessInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
            });
        }

        const guessForm = document.getElementById('guess-form');
        if (guessForm) {
            guessForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const input = document.getElementById('guess-input');
                const message = document.getElementById('message');
                if (!input || !message) return;
                
                const guess = input.value.trim();

                message.textContent = "";
                message.className = "message";

                if (guess.length !== 4) {
                    message.textContent = getText('enterFourDigits');
                    message.classList.add("error");
                    return;
                }
                
                if (hasDuplicateDigits(guess)) {
                    message.textContent = getText('noDuplicates');
                    message.classList.add("error");
                    return;
                }

                const guessArr = guess.split('');
                const secretStr = secretNumbers.join('');

                turns++;
                updateTurnCounter();

                const detailedFeedback = checkDetailedFeedback(secretStr, guess);
                const bulls = checkBulls(secretStr, guess);
                const cows = checkCows(secretStr, guess);

                gameHistory.push({
                    guess: guess,
                    feedback: detailedFeedback,
                    bulls: bulls,
                    cows: cows,
                    turn: turns
                });

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
                    
                    numberBoxes.forEach((box, i) => {
                        box.textContent = secretNumbers[i];
                        box.style.backgroundColor = '#FE938C';
                    });
                    
                    updateTurnCounter();
                    
                    setTimeout(() => {
                        showShareOptions();
                    }, 1000);
                }

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

                    setTimeout(() => {
                        scrollToLatestGuess();
                    }, 100);
                }

                input.value = '';
            });
        }

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
                const instance = prompt(getText('mastodonPrompt')) || 'mastodon.social';
                const cleanInstance = instance.replace(/^https?:\/\//, '').replace(/\/$/, '');
                const mastodonUrl = `https://${cleanInstance}/share?text=${encodedText}`;
                window.open(mastodonUrl, '_blank');
            });
        }

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

        const copyBtn = document.getElementById('copy-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', copyToClipboard);
        }
        
        if (newGameBtn) {
            newGameBtn.addEventListener('click', startNewGame);
        }
    }

    function initializeGame() {
        initializeLanguage();
        generateSecretNumber();
        renderSecretNumberBoxes();
        updateTurnCounter();
        setupEventListeners();
        setupPWAInstall();
        
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && translations[urlLang] && urlLang !== currentLanguage) {
            setLanguage(urlLang);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
    } else {
        initializeGame();
    }

})();