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
        this.wins = document.getElementById('wins');
        this.losses = document.getElementById('losses');
        this.grammyWinnerGuess = document.getElementById('grammy-winner-guess');
        this.numberOfGuessesRemaining = document.getElementById('number-of-guesses-remaining');
        this.lettersAlreadyGuessed = document.getElementById('letters-already-guessed');
        this.loadVideo = document.getElementById('load-video');

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

                if(!hangmanGameObj.started || hangmanGameObj.gameOver) {
                    hangmanGameObj.grammyWinnerGuess.innerHTML = emptySpaceArr.join('');
                    hangmanGameObj.instructions.classList.remove('h6');
                    hangmanGameObj.instructions.classList.add('h5', 'font-italic');
                    hangmanGameObj.instructions.innerHTML = 'Game Started!';
                    hangmanGameObj.subInstructions.classList.remove('d-none');
                    hangmanGameObj.started = true;
                    hangmanGameObj.gameOver = false;
                    return;
                }

                if(hangmanGameObj.started && singleGrammyArtistTotalGuesses > -1 && !hangmanGameObj.gameOver) {
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

                    if(singleGrammyArtistArrToString !== arrWithGuessesToString && singleGrammyArtistTotalGuesses === -1 && !hangmanGameObj.gameOver) {
                        hangmanGameObj.subInstructions.innerHTML = '<strong>* You Lose! Press any key to restart game.</strong>';
                        hangmanGameObj.loadVideo.innerHTML = '<iframe width="560" height="315" src="' + hangmanGameObj.loserVideoUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        hangmanGameObj.started = false;
                        hangmanGameObj.gameOver = true;
                        return;
                    }
                    else if(singleGrammyArtistArrToString === arrWithGuessesToString && !hangmanGameObj.gameOver) {
                        hangmanGameObj.subInstructions.innerHTML = '<strong>* You Win!</strong>';
                        hangmanGameObj.loadVideo.innerHTML = '<iframe width="560" height="315" src="' + hangmanGameObj.grammyWinnersMultidimensionalArr[hangmanGameObj.grammyWinnerArrSelected][1] + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        hangmanGameObj.started = false;
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