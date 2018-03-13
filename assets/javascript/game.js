var numWins = 0;
var currWord = "";
var wordGuessed = [];
var numGuesses = 6;
var lettersGuessed = [];
var guess = null;
var words = ["gorilla", "turtle", "penguin", "chimpanzee", "elephant", "rhino"];

function makeWord() {
    var rand = Math.floor(Math.random() * (words.length));
    console.log(rand);
    currWord = words[rand];
    wordGuessed = [];
    for(var i = 0; i < currWord.length; i++) {
        wordGuessed = wordGuessed.concat("_");
    }
}

function guessLetter(letter) {
    var added = false;
    var found = false;
    for(i = 0; i < currWord.length; i++) {
        if (currWord.charAt(i) === letter) {
            wordGuessed[i] = letter;
            found = true;
        }
    }
    if(lettersGuessed.indexOf(letter) == -1) {
        lettersGuessed = lettersGuessed.concat(letter);
        added = true;
    }
    if(!found && added) {
        numGuesses--;
    }
}

function printWins() {
    document.getElementById("wins").innerHTML = "Number of wins: " + numWins;
}

function printWord() {
    var wordSpaced = "";
    for(var i = 0; i < wordGuessed.length-1; i++) {
        wordSpaced += wordGuessed[i] + "  ";
    }
    wordSpaced += wordGuessed[wordGuessed.length-1];
    document.getElementById("word-spaces").innerHTML = wordSpaced;
}

function printGuesses() {
    document.getElementById("num-guesses").innerHTML = numGuesses;
}

function printLetters() {
    document.getElementById("letters-guessed").innerHTML = lettersGuessed;
}

function equals(arr1, arr2) {
    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}
function start() {
    makeWord();
    numGuesses = 6;
    lettersGuessed = [];
    printWins();
    printWord();
    printGuesses();
    printLetters();
}

function update(guess) {
    guessLetter(guess);
    printWins();
    printWord();
    printGuesses();
    printLetters();
    if(equals(currWord.split(""), wordGuessed)) {
        alert("You win!");
        numWins += 1;
        start();
    }
    if(numGuesses === 0) {
        alert("You Lose!");
        start();
    }
    console.log(currWord.split(""));
    console.log(wordGuessed);
}

start();
document.addEventListener('keyup', function(e) {
    guess = e.key;
    update(guess);
});