const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
   const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
   const words = await response.text();
   const wordArray = words.split("\n");
   const randomIndex = Math.floor(Math.random() * wordArray.length);
   word = wordArray[randomIndex].trim();
   placeholder(word);
};

getWord();

const placeholder = function (word) {
      const placeholderLetters = [];
      for ( const letter of word) {
         // console.log(letter);
         placeholderLetters.push("●");
      }
      wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener ("click", function (e) {
   e.preventDefault();

   message.innerText = "";

   const guess = letterInput.value;
  
   const goodGuess = validateInput(guess);

   if (goodGuess) {
      makeGuess(guess);
   }

   letterInput.value = "";
});

const validateInput = function (input) {
   const acceptedLetter = /[a-zA-Z]/;
   if (input.length === 0) {
      message.innerText = "Please guess a letter!";
} else if (input.length > 1) {
      message.innerText = "Please guess only one letter at a time.";
   } else if (!input.match(acceptedLetter)) {
      message.innerText = "Ooops! Please only guess a letter from A - Z.";
   } else {
      return input;
   }
};

const makeGuess = function (guess) {
   guess = guess.toUpperCase();

   if (guessedLetters.includes(guess)) {
      message.innerText = "Sorry, you already guessed that letter. Try again";
   } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      updateLetters();
      countGuesses(guess);
      updateWord(guessedLetters);
   } 
};

const updateLetters = function () {
   guessedLettersElement.innerHTML = "";
   for (const letter of guessedLetters) {
      const listItem = document.createElement("li");
      listItem.innerText = letter;
      guessedLettersElement.append(listItem);
   }

};

const updateWord = function (guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   const cleanArray = [];
  
   for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
            cleanArray.push(letter.toUpperCase());
         } else {
            cleanArray.push("●");
         }
   }
   // console.log(cleanArray);

   wordInProgress.innerText = cleanArray.join("");
   checkIfWon();
};

const countGuesses = function (guess) {
   const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word has no letter ${guess}.`; 
      remainingGuesses -= 1;
   } else {
      message.innerText = `Good Guess! The word has the letter ${guess}.`;
   }

   if (remainingGuesses === 0) {
      message.innerHTML = `Game Over, you ran out of guesses! The word was <span class="highlight">${word}</span>.`;
   } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
   } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
   }
};

const checkIfWon = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
   }
};





