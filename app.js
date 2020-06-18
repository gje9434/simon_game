window.onload = function () {

    var level = 1;
    var highestLevel = 0;
    const squares = document.querySelectorAll(".square");
    const display = document.querySelector("h1");

    /* while roundInProgress is false, squares clicked whilst 
    sequence is being shown to user don't count */
    var roundInProgress = false;
    
    var squaresClicked;
    var currentSequence;

    document.addEventListener("keyup", playRound);

    /* fade-out then fade-in on square. Used to display
    sequence to user before they start choosing */
    function fadeIn(square) {
        square.classList.add("fade");
        setTimeout(function() {
            square.classList.remove("fade");
        }, 1000);
    }

    function updateHighestLevel() {
        if(level>highestLevel) {
            highestLevel = level;
        }
        document.querySelector("h2").textContent = `Highest Level: ${highestLevel}`;
    }

    // determine if square clicked is the next one in the sequence
    function validateSquare(square) {
        if (squaresClicked == currentSequence.length-1) {
            if (square.dataset.index == currentSequence[squaresClicked]) {
                level += 1;
                roundInProgress = false;
                playRound();
            } 
            else wrongSquareSelected();
        } else if (squaresClicked < currentSequence.length-1) {
            if (square.dataset.index == currentSequence[squaresClicked]) {
                squaresClicked += 1;
            }
            else wrongSquareSelected()
        }
    }

    // handle wrong square being selected. Restarts game
    function wrongSquareSelected() {
        display.textContent = "Round Over! Press any key to start again";
        level = 1;
        document.addEventListener("keyup", playRound);
        roundInProgress = false;
    }

    function chooseRandomSquare() {
        return squares[Math.floor(Math.random() * squares.length)]
    }

    function buildSequence(j) {
        setTimeout(function() {
            let square = chooseRandomSquare();
            currentSequence.push(square.dataset.index);
            fadeIn(square);
        }, 1250*j)
            
    }

    // displays random sequence to user, then allows them to select. 
    function playRound() {
        document.removeEventListener("keyup", playRound);
        updateHighestLevel();
        currentSequence = [];
        display.textContent = `Level ${level}`;
        squaresClicked = 0;
        var i;
        for (i = 0; i < level; i++) {
            buildSequence(i)
        }
        setTimeout(function() {
            /* once sequence is finished being shown, set 
            roundInProgress to true, so that squares clicked
            by the user will count */
            roundInProgress = true;
        },i*1250);

    }

    squares.forEach(square => {
        square.addEventListener("click", e => {
            if(roundInProgress == true) validateSquare(square);
        })
    })
}