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

        // Grammy Winner Empty Spaces Array
        this.grammyWinnerEmptySpacesArr = [];

        // Grammy Winner Indexes Array
        this.grammyWinnerIndexesArr = [];

        //this.createEmptySpacesForGrammyWinnerGuessArr = [];

        // Properties 
        this.gameStarted = false;
        this.grammyWinnerArrSelected = Math.floor(Math.random() * this.grammyWinnersArr.length);
        this.instructions = document.getElementById('instructions');
        this.wins = document.getElementById('wins');
        this.losses = document.getElementById('losses');
        this.grammyWinnerGuess = document.getElementById('grammy-winner-guess');
        this.numberOfGuessesRemaining = document.getElementById('number-of-guesses-remaining');
        this.lettersAlreadyGuessed = document.getElementById('letters-already-guessed');

        this.convertSingleGrammyWinnerIntoArr = function() {
            var grammyWinnerSelectionIntoArr = this.grammyWinnersArr[this.grammyWinnerArrSelected].split('');
            return grammyWinnerSelectionIntoArr;
        };

        this.createEmptySpacesForGrammyWinnerGuessArr = function() {

            for(var i = 0; i < (this.convertSingleGrammyWinnerIntoArr().length); i++) {
                this.grammyWinnerEmptySpacesArr.push('___');
            }
            
            this.grammyWinnerGuess.innerHTML = this.grammyWinnerEmptySpacesArr.map(function(winner) {
                return '___ '
            }).join('');

            var emptySpaceArr = this.grammyWinnerEmptySpacesArr.map(function(winner) {
                return '___ '
            });
            return emptySpaceArr;
        };

        this.addLettersInGuesses = function() {

            var singleGrammyArtistArr = this.convertSingleGrammyWinnerIntoArr();

            var emptySpaceArr = singleGrammyArtistArr.map(function() {
                return ' ___ ';
            });

            var grammyWinnerGuess = this.grammyWinnerGuess;
            var grammyWinnerIndexesArr = this.grammyWinnerIndexesArr;

            document.addEventListener('keyup', function (event) { 
                var key = event.key || event.keyCode;

                var pos = singleGrammyArtistArr.indexOf(key);
                if(pos >= 0) {

                    singleGrammyArtistArr.map(function(winner, index) {
                        if(winner === key) {
                            grammyWinnerIndexesArr.push(index);
                            emptySpaceArr[index] = winner;  
                        }
                    });


                    grammyWinnerGuess.innerHTML = emptySpaceArr.map(function(item) {
                        return item;
                    }).join('');

                }
                else {
                
                }
                
               
            });
        };

        

    }

    var hangmanGameObj = new HangManGame();
    console.log(hangmanGameObj.convertSingleGrammyWinnerIntoArr());
    console.log(hangmanGameObj.createEmptySpacesForGrammyWinnerGuessArr());
    hangmanGameObj.addLettersInGuesses();
})();