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

        this.started = false;

        // Grammy Winner Empty Spaces Array
        this.grammyWinnerEmptySpacesArr = [];

        // Grammy Winner Indexes Array
        this.grammyWinnerIndexesArr = [];

        //this.createEmptySpacesForGrammyWinnerGuessArr = [];

        // Properties 
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
                this.grammyWinnerEmptySpacesArr.push(' ___ ');
            }

            console.log(this.grammyWinnerEmptySpacesArr);
            
            this.grammyWinnerGuess.innerHTML = this.grammyWinnerEmptySpacesArr.join('');

            return this.grammyWinnerEmptySpacesArr;
        };

        this.addLettersInGuesses = function() {
            var singleGrammyArtistArr = this.convertSingleGrammyWinnerIntoArr();

            var emptySpaceArr = singleGrammyArtistArr.map(function() {
                return ' ___ ';
            });

            var grammyWinnerGuess = this.grammyWinnerGuess;
            var grammyWinnerIndexesArr = this.grammyWinnerIndexesArr;
            var lettersGuessed = [];
            var lettersAlreadyGuessed = this.lettersAlreadyGuessed;

            // function removeDuplicatesFromArray(arr) {
            //     var arrNoDuplicates = arr.filter(function(item, index, arr) {
            //         return arr.indexOf(item) >= index;
            //     });   
            //     return arrNoDuplicates;               
            // }

            console.log(singleGrammyArtistArr);

            document.addEventListener('keyup', function (event) {

                if(!hangmanGameObj.started) {
                    hangmanGameObj.grammyWinnerGuess.innerHTML = emptySpaceArr.join('');
                    hangmanGameObj.started = true;
                    return;
                }

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

                    if(lettersGuessed.indexOf(key)) {
                        lettersGuessed.push(key);   
                    }

                    lettersAlreadyGuessed.innerHTML = lettersGuessed.join(' ');
                }
               
            });
        };   

    }

    var hangmanGameObj = new HangManGame();
    hangmanGameObj.addLettersInGuesses();

})();