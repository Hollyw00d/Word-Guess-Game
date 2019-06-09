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

        // Letters guessed
        this.lettersGuessed = [];

        // Array with guesses
        this.arrWithGuesses = [];

        //this.createEmptySpacesForGrammyWinnerGuessArr = [];

        // Properties 
        this.grammyWinnerArrSelected = Math.floor(Math.random() * this.grammyWinnersArr.length);
        this.instructions = document.getElementById('instructions');
        this.subInstructions = document.getElementById('sub-instructions');
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
            
            function arrUnique(arr) {
                return arr.filter(function(item, index){
                    return arr.indexOf(item) >= index;
                });
            }
            
            var singleGrammyArtistArr = this.convertSingleGrammyWinnerIntoArr();
            var singleGrammyArtistTotalGuesses = arrUnique(singleGrammyArtistArr).length + 7;
            var emptySpaceArr = singleGrammyArtistArr.map(function() {
                return ' ___ ';
            });

            var arrWithGuesses = this.arrWithGuesses;

            var lettersGuessed = this.lettersGuessed;

            var grammyWinnerGuess = this.grammyWinnerGuess;
            var grammyWinnerIndexesArr = this.grammyWinnerIndexesArr;
            var lettersAlreadyGuessed = this.lettersAlreadyGuessed;

            console.log(singleGrammyArtistArr);
            console.log(singleGrammyArtistTotalGuesses);

            document.addEventListener('keyup', function (event) {

                if(!hangmanGameObj.started) {
                    hangmanGameObj.grammyWinnerGuess.innerHTML = emptySpaceArr.join('');
                    hangmanGameObj.instructions.classList.remove('h6');
                    hangmanGameObj.instructions.classList.add('h5', 'font-italic');
                    hangmanGameObj.instructions.innerHTML = 'Game Started!';
                    hangmanGameObj.subInstructions.classList.remove('d-none');
                    hangmanGameObj.started = true;
                    return;
                }

                if(hangmanGameObj.started && singleGrammyArtistTotalGuesses > -1) {
                    console.log(emptySpaceArr);
                    var key = event.key || event.keyCode;
                    var pos = singleGrammyArtistArr.indexOf(key);
                    hangmanGameObj.numberOfGuessesRemaining.innerHTML = singleGrammyArtistTotalGuesses;
                    --singleGrammyArtistTotalGuesses;

                    lettersGuessed.push(key);
                    var lettersGuessedUnique = arrUnique(lettersGuessed);
                    lettersAlreadyGuessed.innerHTML = lettersGuessedUnique.join(' ');
                    console.log(lettersGuessedUnique);
    
                    if(pos >= 0) {
    
                        singleGrammyArtistArr.map(function(winner, index) {
                            if(winner === key) {
                                grammyWinnerIndexesArr.push(index);
                                emptySpaceArr[index] = winner;  
                            }
                        });

                        arrWithGuesses = emptySpaceArr.map(function(item) {
                            return item;
                        });
    
                        grammyWinnerGuess.innerHTML = arrWithGuesses.join('');
                             
                        console.log('singleGrammyArtistArr: ', singleGrammyArtistArr);
                        console.log('arrWithGuesses: ', arrWithGuesses);
                    }

                    var singleGrammyArtistArrToString = singleGrammyArtistArr.join('');
                    var arrWithGuessesToString = arrWithGuesses.join('');

                    if(singleGrammyArtistArrToString !== arrWithGuessesToString && singleGrammyArtistTotalGuesses === -1) {
                        console.log('You lose!');
                    }
                    else if(singleGrammyArtistArrToString === arrWithGuessesToString) {
                        console.log('You win!');
                    }

                }


               
            });






        };   

    }

    var hangmanGameObj = new HangManGame();
    hangmanGameObj.addLettersInGuesses();

})();