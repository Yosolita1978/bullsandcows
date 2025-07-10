// --- Initialize the secret number ---
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let secretNumbers = [];
let turns = 0;
let numberBoxes = [];

for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    const number = numbers.splice(index, 1)[0];
    secretNumbers.push(number);
}
console.log("Secret:", secretNumbers.join(""));

// --- Render hidden secret number boxes ---
const numberContainer = document.getElementById('number-container');
secretNumbers.forEach(() => {
    const box = document.createElement('div');
    box.className = 'number-box';
    box.textContent = '*';
    numberContainer.appendChild(box);
    numberBoxes.push(box);
});

// --- Helpers for bulls and cows ---
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

    const guessArr = guess.split('');
    const secretStr = secretNumbers.join('');

    // --- Winning condition ---
    if (guess === secretStr) {
        input.disabled = true;
        numberBoxes.forEach((box, i) => {
            box.textContent = secretNumbers[i];
            box.classList.add('winning-number');
        });
        message.textContent = "You win!";
        message.classList.add("success");
    }

    turns++;
    if (turns >= 10 && guess !== secretStr) {
        message.textContent = "You lose! No more attempts left.";
        message.classList.add("error");
        input.disabled = true;
    }

    const bulls = checkBulls(secretStr, guess);
    const cows = checkCows(secretStr, guess);

    // --- Create guess row with feedback ---
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

    input.value = '';
});

// --- Toggle help instructions ---
document.getElementById('help-link').addEventListener('click', function (e) {
    e.preventDefault();
    const instructions = document.querySelector('.instructions-back');
    instructions.style.display = instructions.style.display === 'block' ? 'none' : 'block';
});
