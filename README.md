# Bulls and Cows Game

This is a simple implementation of the Bulls and Cows game using JavaScript, HTML, and CSS.

## Game Description

Bulls and Cows is a code-breaking game where one player thinks of a secret number, and the other player tries to guess it. For each guess, feedback is provided in terms of "bulls" (correct digits in the correct position) and "cows" (correct digits in the wrong position). The game continues until the second player guesses the number correctly or runs out of attempts.

## Features

- Randomly generates a 4-digit secret number
- Allows the user to input guesses
- Provides feedback on the number of bulls and cows for each guess
- Limits the user to 10 attempts
- Displays a win or lose message based on the user's performance

## Getting Started

### Prerequisites

To run this game, you need a web browser with JavaScript enabled.

### Installation

1. Clone this repository to your local machine.
2. Open `index.html` in your web browser.

### Usage

1. Enter a 4-digit number in the input field.
2. Press Enter or click the "Submit" button to submit your guess.
3. Check the feedback message to see how many bulls and cows you have.
4. Repeat steps 1-3 until you guess the secret number or run out of attempts.

### Files

- `index.html`: The HTML file that sets up the game interface.
- `styles.css`: The CSS file that styles the game interface.
- `script.js`: The JavaScript file that contains the game logic.

## Code Overview

### Variables

- `numbers`: Array containing digits 0-9.
- `secretNumbers`: Array to store the secret number.
- `guesses`: Array to store the user's guesses.
- `guess`: Variable to store the current guess.
- `turns`: Counter for the number of attempts.
- `numberBoxes`: Array to store the DOM elements representing the secret number boxes.

### Functions

- `checkBulls(secretNumber, userInput)`: Returns the number of bulls in the user's guess.
- `checkCows(secretNumber, userInput)`: Returns the number of cows in the user's guess.
- `enforceDigitLimit(event)`: Enforces a 4-digit limit on the user's input.

### Event Listeners

- `keydown` event on the input field to enforce the digit limit.
- `submit` event on the form to handle the user's guess submission.

## Game Logic

1. The secret number is randomly generated when the page loads.
2. The user inputs a guess and submits it.
3. The game checks the guess against the secret number and provides feedback on bulls and cows.
4. The game tracks the number of attempts and ends when the user guesses correctly or runs out of attempts.

### About Me

3+ years of experience in tech mentorship, software engineering, technical workshops, and explaining technical concepts to beginners. 20+ years of experience in project management, communications, content management, and content creation. Proven track record of successful project delivery, event organization, digital marketing campaigns, and website development. Experienced in managing volunteer outreach, creating social media posts, and overseeing pair programming sessions. If you're on the lookout for a technical trainer or customer education specialist with a diverse skill set, I'm eager to explore new opportunities across industries. Let's connect over a coffee or tea and chat about potential collaborations! ☕️