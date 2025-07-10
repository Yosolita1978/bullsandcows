// Initialize important variables
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let secretNumbers = [];
let guesses = [];
let guess = null;
let turns = 0;
let numberBoxes = [];

// Helper function to check how many bulls and return that number
function checkBulls(secretNumber, userInput) {
    let bulls = 0;
    for (let i = 0; i < secretNumber.length; i++) {
        if (secretNumber[i] === userInput[i]) {
            bulls += 1;
        }
    }
    return bulls;
}

// Helper function to check how many cows there is in the user input and return that number
function checkCows(secretNumber, userInput) {
    let cows = 0;
    let secretNumberArr = Array.from(secretNumber);
    for (let i = 0; i < userInput.length; i++) {
        let index = secretNumberArr.indexOf(userInput[i]);
        if (index > -1) {
            if (index !== i) {
                cows += 1;
            }
            secretNumberArr.splice(index, 1, -1);
        }
    }
    return cows;
}

// Initialize the secret number
for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * numbers.length);
    let randomNumber = numbers.splice(index, 1)[0];
    secretNumbers.push(randomNumber);
}
const container = document.getElementById('number-container');
secretNumbers.forEach(number => {
    const numberBox = document.createElement('div');
    numberBox.className = 'number-box';
    numberBox.textContent = "*";
    container.appendChild(numberBox);
    numberBoxes.push(numberBox);
});
console.log(secretNumbers.join(""));

// Function to enforce 4-digit limit
function enforceDigitLimit(event) {
    const input = event.target;
    if (input.value.length >= 4 && event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 13) {
        event.preventDefault();
    }
}

// Add event listener to enforce digit limit
document.getElementById('guess-input').addEventListener('keydown', enforceDigitLimit);

// Check userInput and guess for one turn
document.getElementById('guess-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Initialize variables for the game
    guess = document.getElementById('guess-input').value.trim();
    const message = document.getElementById('message');

    // Check if the guess length is valid
    if (guess.length !== 4) {
        message.className = "error";
        message.textContent = "Please enter a 4-digit number.";
        return;
    }

    guessArr = Array.from(guess);
    guesses.push(guess);

    let secretNumbersString = secretNumbers.join("");
    // Happy path - user wins
    if (secretNumbersString === guess) {
        message.textContent = "You win!";
        message.className = "success";
        document.getElementById('guess-input').disabled = true; // Disable input
        // Update the first row of boxes with the secret number
        for (let i = 0; i < numberBoxes.length; i++) {
            numberBoxes[i].textContent = secretNumbers[i];
            numberBoxes[i].classList.add('winning-number'); // Add the winning color class
        }
    } else {
        turns++; // Increment attempts
        // User didn't find the number - lose no more turns
        if (turns >= 10) {
            message.className = "error";
            message.textContent = "You lose! No more attempts left.";
            document.getElementById('guess-input').disabled = true; // Disable input
        // User didn't find the number - has more turns
        } else {
            let bulls = checkBulls(secretNumbersString, guess);
            let cows = checkCows(secretNumbersString, guess);
            message.className = "error";
            message.textContent = `You have ${bulls} bulls and ${cows} cows and you have ${10 - turns} attempts left`;

            // Create a new row for this guess
            const guessRow = document.getElementById('game-container');
            //const guessRow = document.createElement('div');
            guessRow.className = 'container';

            // Add the guess boxes to the row
            guessArr.forEach(number => {
                const numberBox = document.createElement('div');
                numberBox.className = 'number-box';
                numberBox.textContent = number;
                guessRow.appendChild(numberBox);
            });

            // Add the feedback to the row
            const feedback = document.createElement('div');
            feedback.className = 'feedback';
            feedback.textContent = `Bulls: ${bulls}, Cows: ${cows}`;
            guessRow.appendChild(feedback);
        }
    }

    // Clear the input field
    document.getElementById('guess-input').value = "";
});

// Toggle help instructions
document.getElementById('help-link').addEventListener('click', function (e) {
    e.preventDefault();
    const instructions = document.querySelector('.instructions-back');
    instructions.style.display = instructions.style.display === 'block' ? 'none' : 'block';
});