var numWins = 0;
var currWord = "";
var wordGuessed = [];
var numGuesses = 8;
var lettersGuessed = [];
var guess = null;
var words = ["gorilla", "turtle", "penguin", "chimpanzee", "elephant", "rhino"];

function makeWord() {
    var rand = Math.floor(Math.random() * (words.length));
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
    for(var i = 0; i < wordGuessed.length; i++) {
        wordSpaced += wordGuessed[i] + "  ";
    }
    document.getElementById("word-spaces").innerHTML = wordSpaced;
}

function printGuesses() {
    document.getElementById("num-guesses").innerHTML = numGuesses;
}

function printLetters() {
    var lettersSpaced = "";
    for(var i = 0; i < lettersGuessed.length; i++) {
        lettersSpaced += lettersGuessed[i] + "  ";
    }
    lettersSpaced = lettersSpaced.toUpperCase();
    document.getElementById("letters-guessed").innerHTML = lettersSpaced;
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
    numGuesses = 8;
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
}

start();
document.addEventListener('keyup', function(e) {
    guess = e.key;
    update(guess);
});