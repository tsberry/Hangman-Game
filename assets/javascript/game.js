

var game = {
    numWins: 0,
    currWord: "",
    wordGuessed: [],
    numGuesses: 8,
    lettersGuessed: [],
    guess: null,
    words: ["gorilla", "turtle", "penguin", "chimpanzee", "elephant", "rhino"],

    makeWord: function () {
        var rand = Math.floor(Math.random() * (this.words.length));
        this.currWord = this.words[rand];
        this.wordGuessed = [];
        for (var i = 0; i < this.currWord.length; i++) {
            this.wordGuessed = this.wordGuessed.concat("_");
        }
    },

    guessLetter: function (letter) {
        var added = false;
        var found = false;
        for (i = 0; i < this.currWord.length; i++) {
            if (this.currWord.charAt(i) === letter) {
                this.wordGuessed[i] = letter;
                found = true;
            }
        }
        if (this.lettersGuessed.indexOf(letter) == -1) {
            this.lettersGuessed = this.lettersGuessed.concat(letter);
            added = true;
        }
        if (!found && added) {
            this.numGuesses--;
        }
    },

    printWins: function () {
        document.getElementById("wins").innerHTML = "Number of wins: " + this.numWins;
    },

    printWord: function () {
        var wordSpaced = "";
        for (var i = 0; i < this.wordGuessed.length; i++) {
            wordSpaced += this.wordGuessed[i] + "  ";
        }
        document.getElementById("word-spaces").innerHTML = wordSpaced;
    },

    printGuesses: function () {
        document.getElementById("num-guesses").innerHTML = this.numGuesses;
    },

    printLetters: function () {
        var lettersSpaced = "";
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            lettersSpaced += this.lettersGuessed[i] + "  ";
        }
        lettersSpaced = lettersSpaced.toUpperCase();
        document.getElementById("letters-guessed").innerHTML = lettersSpaced;
    },



    start: function () {
        this.makeWord();
        this.numGuesses = 8;
        this.lettersGuessed = [];
        this.printWins();
        this.printWord();
        this.printGuesses();
        this.printLetters();
    },

    update: function (guess) {
        this.guessLetter(guess);
        this.printWins();
        this.printWord();
        this.printGuesses();
        this.printLetters();
        if (equals(this.currWord.split(""), this.wordGuessed)) {
            alert("You win!");
            this.numWins += 1;
            this.start();
        }
        if (this.numGuesses === 0) {
            alert("You Lose!");
            this.start();
        }
    }
}

function equals(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

game.start();
document.addEventListener('keyup', function (e) {
    guess = e.key;
    game.update(guess);
});