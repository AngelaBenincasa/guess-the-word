const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
      const placeholderLetters = [];
      for ( const letter of word) {
         // console.log(letter);
         placeholderLetters.push("●");
      }
      wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
      updateWord(guessedLetters);
   } 
};

const updateLetters = function () {
   guessedLettersElement.innerHTML = "";
   if (guessedLetters !== "") {
      let listItem = document.createElement("li");
      listItem.innerText = guessedLetters;
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

const checkIfWon = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
   }
};