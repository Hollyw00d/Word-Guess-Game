// Start anonymous function
(function() {
    // Function constructor for hangman game
    function HangManGame() {
        // Seattle Grammy Winners Array with Seattle Grammy winner names
        // and YouTube videos to embed in <iframe ...></frame> tag 
        this.grammyWinnersMultidimensionalArr = [
            ['Brandi Carlile', 'https://www.youtube.com/embed/o8pQLtHTPaI'],
            ['Sound Garden', 'https://www.youtube.com/embed/T0_zzCLLRvE'],
            ['Sir Mix-A-Lot', 'https://www.youtube.com/embed/bgDSkryQjwo'],
            ['Quincy Jones', 'https://www.youtube.com/embed/k-uQMASvl3A'],
            ['Pearl Jam', 'https://www.youtube.com/embed/T3oMcrqDn_4'],
            ['Macklemore & Ryan Lewis', 'https://www.youtube.com/embed/R2nSdVWHiQY'],
            ['Ray Charles', 'https://www.youtube.com/embed/QL3EZwSJAh0']
        ];

        // Empty Seattle grammy winners array
        this.grammyWinnersArr = [];
        for(var i = 0; i < this.grammyWinnersMultidimensionalArr.length; i++) {
            this.grammyWinnersArr.push(this.grammyWinnersMultidimensionalArr[i][0]); 
        }

        // Loser video showing Beck's "Loser" song
        this.loserVideoUrl = 'https://www.youtube.com/embed/5Z1-5wNjMgs';

        // Game started
        this.started = false;
        // Game over
        this.gameOver = false;

        // Grammy Winner Empty Spaces Array
        this.grammyWinnerEmptySpacesArr = [];

        // Grammy Winner Indexes Array
        this.grammyWinnerIndexesArr = [];

        // Letters guessed
        this.lettersGuessed = [];

        // Array with guesses
        this.arrWithGuesses = [];

        // Select random grammy winner arr index
        this.grammyWinnerArrSelected = Math.floor(Math.random() * this.grammyWinnersArr.length);

        // document.getElementById variables
        this.instructions = document.getElementById('instructions');
        this.subInstructions = document.getElementById('sub-instructions');
        this.grammyWinnerGuess = document.getElementById('grammy-winner-guess');
        this.numberOfGuessesRemaining = document.getElementById('number-of-guesses-remaining');
        this.lettersAlreadyGuessed = document.getElementById('letters-already-guessed');
        this.loadVideo = document.getElementById('load-video');

        // Return random grammy winner arr index
        // this.grammyWinnerArrSelected = function(arr) {
        //     return Math.floor(Math.random() * arr.length);
        // }

        // Convert single grramy winner into array
        this.convertSingleGrammyWinnerIntoArr = function() {
            var grammyWinnerSelectionIntoArr = this.grammyWinnersArr[this.grammyWinnerArrSelected].split('');
            return grammyWinnerSelectionIntoArr;
        };

        // Convert single grammy winner into empty spaces array with same length
        this.createEmptySpacesForGrammyWinnerGuessArr = function() {
            for(var i = 0; i < (this.convertSingleGrammyWinnerIntoArr().length); i++) {
                this.grammyWinnerEmptySpacesArr.push(' ___ ');
            } 
            this.grammyWinnerGuess.innerHTML = this.grammyWinnerEmptySpacesArr.join('');
            return this.grammyWinnerEmptySpacesArr;
        };

        // Add letters in guesses
        this.addLettersInGuesses = function() {
            
            // Function to get unique elements in array
            function arrUnique(arr) {
                return arr.filter(function(item, index){
                    return arr.indexOf(item) >= index;
                });
            }  


            // Save single grammy artist converted into array in variable
            var singleGrammyArtistArr = this.convertSingleGrammyWinnerIntoArr();

            // Get single grammy artist total guesses by passing 
            // singleGrammyArtistArr into arrUnique().length function/property and adding 11
            var singleGrammyArtistTotalGuesses = arrUnique(singleGrammyArtistArr).length + 11;
            var emptySpaceArr = singleGrammyArtistArr.map(function() {
                return ' ___ ';
            });

            // Array with guesses
            var arrWithGuesses = this.arrWithGuesses;
            // Letters Guesses
            var lettersGuessed = this.lettersGuessed;
            // Grammy winner guess
            var grammyWinnerGuess = this.grammyWinnerGuess;
            // Grammy winner indexes array
            var grammyWinnerIndexesArr = this.grammyWinnerIndexesArr;
            // letters already guessed array
            var lettersAlreadyGuessed = this.lettersAlreadyGuessed;
            //
            var grammyWinnerArrSelected = this.grammyWinnerArrSelected;
            console.log(singleGrammyArtistArr);

            // Start on keyup event handler
            document.addEventListener('keyup', function (event) {
                // Reset game after winning, lose, or first starting game
                function reset() {
                    hangmanGameObj.grammyWinnerGuess.innerHTML = emptySpaceArr.join('');
                    hangmanGameObj.instructions.classList.remove('h6');
                    hangmanGameObj.instructions.classList.add('h5', 'font-italic');
                    hangmanGameObj.instructions.innerHTML = 'Game Started!';
                    hangmanGameObj.subInstructions.classList.remove('d-none');
                    hangmanGameObj.started = true;
                    
                    console.log(grammyWinnerArrSelected);
                }

                if(!hangmanGameObj.started && !hangmanGameObj.gameOver || hangmanGameObj.started && hangmanGameObj.gameOver) {
                    reset();
                }

                if(hangmanGameObj.started && singleGrammyArtistTotalGuesses > -1 && !hangmanGameObj.gameOver) {
                    //console.log(emptySpaceArr);
                    var key = event.key || event.keyCode;
                    var pos = singleGrammyArtistArr.indexOf(key);
                    hangmanGameObj.numberOfGuessesRemaining.innerHTML = singleGrammyArtistTotalGuesses;
                    --singleGrammyArtistTotalGuesses;

                    lettersGuessed.push(key);
                    var lettersGuessedUnique = arrUnique(lettersGuessed);
                    lettersAlreadyGuessed.innerHTML = lettersGuessedUnique.join(' ');
                    //console.log(lettersGuessedUnique);
    
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
                    }

                    var singleGrammyArtistArrToString = singleGrammyArtistArr.join('');
                    var arrWithGuessesToString = arrWithGuesses.join('');

                    if(singleGrammyArtistArrToString !== arrWithGuessesToString && singleGrammyArtistTotalGuesses === -1 && !hangmanGameObj.gameOver) {
                        hangmanGameObj.subInstructions.classList.add('d-none');
                        hangmanGameObj.instructions.innerHTML = 'You lose!';
                        hangmanGameObj.loadVideo.innerHTML = '<iframe width="560" height="315" src="' + hangmanGameObj.loserVideoUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        hangmanGameObj.started = true;
                        hangmanGameObj.gameOver = true;
                        return;
                    }
                    else if(singleGrammyArtistArrToString === arrWithGuessesToString && !hangmanGameObj.gameOver) {
                        hangmanGameObj.subInstructions.classList.add('d-none');
                        hangmanGameObj.instructions.innerHTML = 'You win!';
                        hangmanGameObj.loadVideo.innerHTML = '<iframe width="560" height="315" src="' + hangmanGameObj.grammyWinnersMultidimensionalArr[hangmanGameObj.grammyWinnerArrSelected][1] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        hangmanGameObj.started = true;
                        hangmanGameObj.gameOver = true;
                        return;
                    }

                }

               
            });
        };   
    }

    var hangmanGameObj = new HangManGame();
    hangmanGameObj.addLettersInGuesses();

})();