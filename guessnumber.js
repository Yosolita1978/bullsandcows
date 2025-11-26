const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let secretNumbers = [];
let attempts = 10;

for (let i = 0; i < 4; i++) {
  let index = Math.floor(Math.random() * numbers.length);
  let randomNumber = numbers.splice(index, 1)[0];
  secretNumbers.push(randomNumber);
}

function guessNumber() {
  if (attempts === 0) {
    console.log(`You lost! No more attempts left. The secret number was ${secretNumbers.join('')}`);
    rl.close();
    return;
  }

  rl.question('Please enter a 4 digits number 0-9 | No duplicates: ', (guessUser) => {
    if (guessUser.length !== 4) {
      console.log('Please enter a 4 digits number');
      attempts--;
      console.log(`You have ${attempts} attempts left`);
      guessNumber();
      return;
    }

    if (guessUser === secretNumbers.join('')) {
      console.log(`You won! The secret number was ${secretNumbers.join('')}`);
      rl.close();
      return;
    }

    attempts--;
    console.log(`Wrong! You have ${attempts} attempts left`);
    guessNumber();
  });
}

guessNumber();

// [6,8,0,4]
// attempt 1 - give a 5 number or try do letter - fails still rest attempts
// give half righ number [6832]  A fail attempt 2
// give the right number [6804]  A win - we won

// guess two things - 