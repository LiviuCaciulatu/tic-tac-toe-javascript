let gameTurn = 0;
let currentPlayer;
let board;

// this function will be called whenever the user changes the `select` input labeled `please select game mode`
function setGameMode(selectedValue) {
    switch (selectedValue) {
        case 'human-human':
            isPlayerXHuman = true;
            isPlayerYHuman = true;
            break;
        case 'human-ai':
            isPlayerXHuman = true;
            isPlayerYHuman = false;
            break;
        case 'ai-ai':
            isPlayerXHuman = false;
            isPlayerYHuman = false;
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
    setHTMLvisibilityForInputHumanCoordinates(true);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(true);
    displayMessage("Player X's turn");
}

// this function is called whenever the user presses the `enter` key in the input box labeled `enter coordinates` paramerter: input - the content of the input box
function processHumanCoordinate(input) {
    console.log(`'processHumanCoordinate('${input}')`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        console.log("Player O turn")
    } else {
        currentPlayer = 'pets';
        console.log("Player X turn")
    }

    let coordinates = extractCoordinates(input);
    board[coordinates.x][coordinates.y] = currentPlayer;
    // TODO: add a message stating either
    // Player X's turn
    // Player O's turn
    // It's a tie
    // Player X won 
    // Player O won 
    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
        // setHTMLvisibilityForInputAiCoordinatesInput(false);
        // setHTMLvisibilityForInputHumanCoordinates(false);
    }else {
        if (gameTurn === 8) {
            // If the game has reached turn 9 and there is no winner, it's a tie
            displayMessage("It's a tie!");
        } else {
            // Otherwise, display the next player's turn
            if (currentPlayer === 'diamond') {
                displayMessage("Player O's turn");
            } else {
                displayMessage("Player X's turn");
            }
        }
    }

    gameTurn += 1;
    displayBoard(board);

    document.getElementsByClassName("coordinates")[0].children[0].value=""

    if (!isPlayerYHuman){
        if (getWinningPlayer(board)){
            setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForInputHumanCoordinates(false);
        } else {
        setHTMLvisibilityForInputAiCoordinatesInput(true);
        setHTMLvisibilityForInputHumanCoordinates(false);
        }
    }
}
    // TODO: add conditions to hide the coordinates screen for the human player & show for the button to generate AI coordinates


// this function is called whenever the user presses the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        console.log("Player O turn")
    } else {
        currentPlayer = 'pets';
        console.log("Player X turn")
    }

    let find = 0
    board.forEach((array, i) => {
        array.forEach((element, j) => {
            if (element === '' && find === 0) {
                board[i][j] = currentPlayer
                find ++
            }
        });
    });

    setHTMLvisibilityForInputGameMode(false);
    setHTMLvisibilityForInputHumanCoordinates(true);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(true);
    displayMessage("Player X's turn");
    displayBoard(board);
    gameTurn += 1;
    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForInputHumanCoordinates(false);
    }else {
        if (gameTurn > 8) {
            // If the game has reached turn 9 and there is no winner, it's a tie
            displayMessage("It's a tie!");
        } else {
            // Otherwise, display the next player's turn
            if (currentPlayer === 'diamond') {
                displayMessage("Player O's turn");
            } else {
                displayMessage("Player X's turn");
            }
        }
    }
}

// this function is called when the user clicks on the button labeled `Restart Game`
function resetGame() {
    console.log(`resetGame()`);
    resetBoard()
    displayBoard(board);
    setHTMLvisibilityForInputGameMode(true);
    setHTMLvisibilityForInputHumanCoordinates(false);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(false);
    displayMessage("");
    document.getElementsByTagName("select")[0].value="";
    document.getElementsByClassName("coordinates")[0].children[0].value="";
    gameTurn=0;
}

// this function should change from A1..C3 to coordinates that are present in the `board` global variable
function extractCoordinates(input) {
    // this is a sample of what should be returned if the the user had typed `A1`, you need to add the to also treat other cases (A2..C3)
    switch(input.toUpperCase()){
    case "A1":
        if (board[0][0]==="pets" || board[0][0]==='diamond'){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 0, y: 0
        };
        break;
    case "A2":
        if (board[0][1]==="pets"||board[0][1]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 0, y: 1
        };
        break;
    case "A3":
        if (board[0][2]==="pets"||board[0][2]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 0, y:2
        };
        break;
    case "B1":
        if (board[1][0]==="pets" || board[1][0]==='diamond'){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 1, y: 0
        };
        break;
    case "B2":
        if (board[1][1]==="pets"||board[1][1]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 1, y: 1
        };
        break;
    case "B3":
        if (board[1][2]==="pets"||board[1][2]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 1, y:2
        };
        break;
    case "C1":
        if (board[2][0]==="pets" || board[2][0]==='diamond'){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 2, y: 0
        };
        break;
    case "C2":
        if (board[2][1]==="pets"||board[2][1]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 2, y: 1
        };
        break;
    case "C3":
        if (board[2][2]==="pets"||board[2][2]==="diamond"){
            displayMessage("Position is already taken on board");
            break;
        }
        return{
            x: 2, y:2
        };
        break;
    default:
        displayMessage("Invalid coordinate entered")
    }
}

// this function should return `X` or `O` or undefined (carefull it's not a string ) based on interpreting the values in the board variable
function getWinningPlayer(board) {
    if ((board[0][0]===board[0][1]&&board[0][1]===board[0][2])&&(board[0][0]==="pets"||board[0][0]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][0];
    } else if ((board[1][0]===board[1][1]&&board[1][1]===board[1][2])&&(board[1][0]==="pets"||board[1][0]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[1][0];
    } else if ((board[2][0]===board[2][1]&&board[2][1]===board[2][2])&&(board[2][0]==="pets"||board[2][0]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[2][0];
    } else if ((board[0][0]===board[1][0]&&board[1][0]===board[2][0])&&(board[0][0]==="pets"||board[0][0]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][0];
    } else if((board[0][1]===board[1][1]&&board[1][1]===board[2][1])&&(board[0][1]==="pets"||board[0][1]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][1];
    } else if((board[0][2]===board[1][2]&&board[1][2]===board[2][2])&&(board[0][2]==="pets"||board[0][2]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][2];
    } else if((board[0][0]===board[1][1]&&board[1][1]===board[2][2])&&(board[0][0]==="pets"||board[0][0]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][0];
    } else if ((board[0][2]===board[1][1]&&board[1][1]===board[2][0])&&(board[0][2]==="pets"||board[0][2]==="diamond")){
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        return board[0][2]
    }
    return undefined;
}