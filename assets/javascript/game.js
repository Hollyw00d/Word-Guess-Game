// Start anonymous function
(function() {
    // Function constructor for hangman game
    function HangManGame() {
        // Seattle Grammy Winners Array
        this.grammyWinnersArr = [
            'Brandi Carlile',
            'Sound Garden',
            'Sir Mix-A-Lot',
            'Quincy Jones',
            'Pearl Jam',
            'Macklemore & Ryan Lewis',
            'Ray Charles'
        ];

        // Properties 
        this.wins = document.getElementById('wins');
        this.losses = document.getElementById('losses');
        this.grammyWinnerGuess = document.getElementById('grammy-winner-guess');
        this.numberOfGuessesRemaining = document.getElementById('number-of-guesses-remaining');
        this.lettersAlreadyGuessed = document.getElementById('letters-already-guessed');

    }

})();