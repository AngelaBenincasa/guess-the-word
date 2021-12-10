const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";

const letterPlaceholder = function (word) {

      const letters = [];

      for ( const letter of word) {
         // console.log(letter);
         letters.push("●");
      }

      wordInProgress.innerText = letters.join("");
};

letterPlaceholder(word);

guessButton.addEventListener ("click", function (e) {
   e.preventDefault();
   const guess = letterInput.value;
   console.log(guess);
   letterInput.value = "";
});