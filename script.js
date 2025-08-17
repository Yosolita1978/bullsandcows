// --- Initialize the secret number ---
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let secretNumbers = [];
let turns = 0;
let numberBoxes = [];
let gameEnded = false;
let playerWon = false;

// NEW: Variables for enhanced sharing
let gameHistory = []; // Store each guess and its detailed feedback

for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    const number = numbers.splice(index, 1)[0];
    secretNumbers.push(number);
}
console.log("Secret:", secretNumbers.join(""));

// --- Helper to check for duplicate digits ---
function hasDuplicateDigits(numberString) {
    const digits = numberString.split('');
    const uniqueDigits = new Set(digits);
    return digits.length !== uniqueDigits.size;
}

// --- Render hidden secret number boxes ---
const numberContainer = document.getElementById('number-container');
secretNumbers.forEach(() => {
    const box = document.createElement('div');
    box.className = 'number-box';
    box.textContent = '*';
    numberContainer.appendChild(box);
    numberBoxes.push(box);
});

// --- Update turn counter ---
function updateTurnCounter() {
    const turnCounter = document.getElementById('turn-counter');
    if (turns === 0) {
        turnCounter.textContent = 'Get ready to play!';
    } else if (!gameEnded) {
        turnCounter.textContent = `Attempt ${turns} of 10`;
    } else if (playerWon) {
        turnCounter.textContent = `🎉 Won in ${turns} attempt${turns === 1 ? '' : 's'}!`;
    } else {
        turnCounter.textContent = '💔 Game Over - 10 attempts used';
    }
}

// NEW: Enhanced feedback analysis for sharing (returns detailed position data)
function checkDetailedFeedback(secret, input) {
    const feedback = [];
    const secretArr = secret.split('');
    const inputArr = input.split('');
    const usedSecretIndices = new Set();
    const usedInputIndices = new Set();
    
    // First pass: find bulls (correct position)
    for (let i = 0; i < inputArr.length; i++) {
        if (secretArr[i] === inputArr[i]) {
            feedback[i] = 'bull'; // 🐂 Bull emoji
            usedSecretIndices.add(i);
            usedInputIndices.add(i);
        }
    }
    
    // Second pass: find cows (correct digit, wrong position)
    for (let i = 0; i < inputArr.length; i++) {
        if (!usedInputIndices.has(i)) {
            for (let j = 0; j < secretArr.length; j++) {
                if (!usedSecretIndices.has(j) && secretArr[j] === inputArr[i]) {
                    feedback[i] = 'cow'; // 🐄 Cow emoji
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
            feedback[i] = 'miss'; // ⚫ Black circle
        }
    }
    
    return feedback;
}

// --- Original bulls helper (kept for display purposes) ---
function checkBulls(secret, input) {
    let bulls = 0;
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === input[i]) bulls++;
    }
    return bulls;
}

// --- Original cows helper (kept for display purposes) ---
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

// NEW: Generate emoji grid from game history
function generateEmojiGrid() {
    let grid = '';
    
    gameHistory.forEach(entry => {
        let row = '';
        entry.feedback.forEach(result => {
            switch(result) {
                case 'bull':
                    row += '🐂'; // Bull emoji for correct position
                    break;
                case 'cow':
                    row += '🐄'; // Cow emoji for correct digit, wrong position
                    break;
                case 'miss':
                    row += '⚫'; // Black circle for wrong digit
                    break;
            }
        });
        grid += row + '\n';
    });
    
    return grid.trim();
}

// --- UPDATED: Share functionality with new format ---
function generateShareMessage() {
    const grid = generateEmojiGrid();
    const attemptsText = playerWon ? `${turns}/10` : 'X/10';
    
    let message = `I just played Bulls & Cows!\n\n`;
    
    if (playerWon) {
        message += `🎉 I won in ${turns} attempt${turns === 1 ? '' : 's'}!\n\n`;
    } else {
        message += `😅 I couldn't crack the code in 10 attempts!\n\n`;
    }
    
    message += `Bulls & Cows ${attemptsText}\n\n`;
    message += grid + '\n\n';
    
    if (playerWon) {
        message += `Can you beat my score?\n\n`;
    } else {
        message += `Can you do better?\n\n`;
    }
    
    message += 'https://bulls.yosola.co';
    
    return message;
}

function showShareOptions() {
    const shareContainer = document.getElementById('share-container');
    shareContainer.style.display = 'block';
}

// --- Auto-scroll to bottom of game container ---
function scrollToLatestGuess() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.scrollTop = gameContainer.scrollHeight;
}

// --- Limit input to 4 digits ---
document.getElementById('guess-input').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// --- Form submission logic ---
document.getElementById('guess-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const input = document.getElementById('guess-input');
    const message = document.getElementById('message');
    const guess = input.value.trim();

    // Clear message on every submit
    message.textContent = "";
    message.className = "message";

    if (guess.length !== 4) {
        message.textContent = "Please enter a 4-digit number.";
        message.classList.add("error");
        return;
    }
    
    // Check for duplicate digits
    if (hasDuplicateDigits(guess)) {
        message.textContent = "Please enter 4 different digits (no duplicates allowed).";
        message.classList.add("error");
        return;
    }

    const guessArr = guess.split('');
    const secretStr = secretNumbers.join('');

    turns++;
    updateTurnCounter(); // Update counter immediately after incrementing turns

    // NEW: Get detailed feedback for sharing
    const detailedFeedback = checkDetailedFeedback(secretStr, guess);
    
    // Original: Calculate bulls and cows for display (keeps same user experience)
    const bulls = checkBulls(secretStr, guess);
    const cows = checkCows(secretStr, guess);

    // NEW: Store this guess in game history for sharing
    gameHistory.push({
        guess: guess,
        feedback: detailedFeedback,
        bulls: bulls,
        cows: cows,
        turn: turns
    });

    // --- Winning condition ---
    if (guess === secretStr) {
        input.disabled = true;
        gameEnded = true;
        playerWon = true;
        
        numberBoxes.forEach((box, i) => {
            box.textContent = secretNumbers[i];
            box.classList.add('winning-number');
        });
        message.textContent = "You win!";
        message.classList.add("success");
        
        updateTurnCounter(); // Update with winning message
        
        // Show share options
        setTimeout(() => {
            showShareOptions();
        }, 1000);
    }

    if (turns >= 10 && guess !== secretStr) {
        gameEnded = true;
        playerWon = false;
        
        message.textContent = "You lose! No more attempts left.";
        message.classList.add("error");
        input.disabled = true;
        
        // Reveal the secret number
        numberBoxes.forEach((box, i) => {
            box.textContent = secretNumbers[i];
            box.style.backgroundColor = '#FE938C';
        });
        
        updateTurnCounter(); // Update with losing message
        
        // Show share options
        setTimeout(() => {
            showShareOptions();
        }, 1000);
    }

    // --- Create guess row with feedback (same as before) ---
    const gameContainer = document.getElementById('game-container');

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
    feedback.textContent = `Bulls: ${bulls}, Cows: ${cows}`;

    guessBlock.appendChild(guessRow);
    guessBlock.appendChild(feedback);
    gameContainer.appendChild(guessBlock);

    // Auto-scroll to show the latest guess
    setTimeout(() => {
        scrollToLatestGuess();
    }, 100);

    input.value = '';
});

// --- Toggle help instructions ---
document.getElementById('help-link').addEventListener('click', function (e) {
    e.preventDefault();
    const instructions = document.querySelector('.instructions-back');
    instructions.style.display = instructions.style.display === 'block' ? 'none' : 'block';
});

// --- Share functionality event listeners ---
document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const shareText = generateShareMessage();
    const encodedText = encodeURIComponent(shareText);
    
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
});

document.getElementById('mastodon-btn').addEventListener('click', () => {
    const shareText = generateShareMessage();
    const encodedText = encodeURIComponent(shareText);
    
    // Prompt user for their Mastodon instance or use a default
    const instance = prompt('Enter your Mastodon instance (e.g., mastodon.social):') || 'mastodon.social';
    const cleanInstance = instance.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    const mastodonUrl = `https://${cleanInstance}/share?text=${encodedText}`;
    window.open(mastodonUrl, '_blank');
});

// Initialize turn counter on page load
updateTurnCounter();