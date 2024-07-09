const gameBoard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {board};
})();

function player(name, choice) {
    return {name, choice};
};

const displayController = (function() {
    const gridSquares = document.querySelectorAll('.grid > *');
    const markBoard = function(playerChoice, playerPosition) {
        gameBoard.board[playerPosition] = playerChoice;
        gridSquares[playerPosition].innerHTML = gameBoard.board[playerPosition];
        displayController.gridSquares[playerPosition].innerHTML = playerChoice;
    };

    const startButton = document.querySelector('form > button');
    const playersNamesText = document.querySelectorAll('input[name="name"]');
    const player1SymbolRadios = document.querySelectorAll('input[name="symbol"]');

    const playersNamesCells = document.querySelectorAll('tbody > tr > td.name');
    const playersSymbolCells = document.querySelectorAll('tbody > tr > td.symbol');
    const playersTurnCells = document.querySelectorAll('tbody > tr > td.turn');

    return {gridSquares, markBoard, startButton, playersNamesText, player1SymbolRadios, playersNamesCells, playersSymbolCells, playersTurnCells};
})();

const game = (function() {
    let getWinner, activePlayer = true;
    const options = {
        cross: 'x',
        circle: 'o'
    };

    displayController.startButton.addEventListener('click', () => {
        const player1Name = displayController.playersNamesText[0].value;
        const player2Name = displayController.playersNamesText[1].value;

        if(displayController.player1SymbolRadios[0].checked === true) {
            startGame(player1Name, player2Name, options.cross, options.circle);
        } else if(displayController.player1SymbolRadios[1].checked === true) {
            startGame(player1Name, player2Name, options.circle, options.cross);
        };
    });

    function startGame(player1Name, player2Name, player1Choice, player2Choice) {
        const player1 = player(player1Name, player1Choice);
        const player2 = player(player2Name, player2Choice);

        displayController.playersNamesCells[0].innerHTML = player1Name;
        displayController.playersNamesCells[1].innerHTML = player2Name;
        displayController.playersSymbolCells[0].innerHTML = player1Choice;
        displayController.playersSymbolCells[1].innerHTML = player2Choice;
        displayController.playersTurnCells[0].innerHTML = "It's your turn!!";

        for(let i = 0; i < displayController.gridSquares.length; i++) {
            displayController.gridSquares[i].addEventListener('click', () => {
                if(gameBoard.board[i] !== player1.choice && gameBoard.board[i] !== player2.choice) {
                    if(activePlayer === true) {
                        displayController.playersTurnCells[1].innerHTML = "It's your turn!!";
                        displayController.playersTurnCells[0].innerHTML = "";

                        displayController.markBoard(player1.choice, i);
                        activePlayer = false;
                    } else {
                        displayController.playersTurnCells[0].innerHTML = "It's your turn!!";
                        displayController.playersTurnCells[1].innerHTML = "";
                        
                        displayController.markBoard(player2.choice, i);
                        activePlayer = true;
                    }
                    
                    for(let option in options) {
                        for(let i = 0; i <= 6; i+=3){
                            if(gameBoard.board[i] === options[option] && 
                                gameBoard.board[i+1] === options[option] && 
                                gameBoard.board[+2] === options[option]) {
                                declareGetWinner();
                            };
                        };
                        for(let i = 0; i <= 2; i++){
                            if(gameBoard.board[i] === options[option] && 
                                gameBoard.board[i+3] === options[option] && 
                                gameBoard.board[i+6] === options[option]) {
                                declareGetWinner();
                            };
                        };
                        if((gameBoard.board[0] === options[option] && 
                            gameBoard.board[4] === options[option] && 
                            gameBoard.board[8] === options[option]) ||
                            (gameBoard.board[2] === options[option] && 
                            gameBoard.board[4] === options[option] && 
                            gameBoard.board[6] === options[option])) {
                            declareGetWinner();
                        };
                        
                        function declareGetWinner() {   
                            game.getWinner = (player1.choice === options[option]) ? 
                            `${player1.name} is the winner!!`:
                            `${player2.name} is the winner!!`;
                        };
                    };
                } else {
                    alert('This field has been taken already.');
                };
            });
        };
    };
    
    return {getWinner};
})();