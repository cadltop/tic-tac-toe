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

    const setPlayersData = function() {
        playersNamesCells[0].innerHTML = playersNamesText[0].value;
        playersNamesCells[1].innerHTML = playersNamesText[1].value;

        if(player1SymbolRadios[0].checked === true) {
            const player1 = player(playersNamesText[0].value, 'x');
            const player2 = player(playersNamesText[1].value, 'o');
            setSymbolsAndTurn(player1, player2);
            return [player1, player2]
        } else if(player1SymbolRadios[1].checked === true) {
            const player1 = player(playersNamesText[0].value, 'o');
            const player2 = player(playersNamesText[1].value, 'x');
            setSymbolsAndTurn(player1, player2);
            return [player1, player2]
        };
        function setSymbolsAndTurn(player1, player2) {
            playersSymbolCells[0].innerHTML = player1.choice;
            playersSymbolCells[1].innerHTML = player2.choice;
            playersTurnCells[0].innerHTML = "It's your turn!!";
        }
    };
    const showTurns = function(activePlayer) {
        if(activePlayer == true) {
            playersTurnCells[1].innerHTML = "It's your turn!!";
            playersTurnCells[0].innerHTML = "";
        } else {
            playersTurnCells[0].innerHTML = "It's your turn!!";
            playersTurnCells[1].innerHTML = "";
        };
    };

    return {gridSquares, markBoard, startButton, setPlayersData, showTurns};
})();

const game = (function() {
    let getWinner, activePlayer = true;
    const options = {
        cross: 'x',
        circle: 'o'
    };

    displayController.startButton.addEventListener('click', () => {
        const players = displayController.setPlayersData();
        for(let i = 0; i < displayController.gridSquares.length; i++) {
            displayController.gridSquares[i].addEventListener('click', () => {
                if(gameBoard.board[i] !== players[0].choice && gameBoard.board[i] !== players[1].choice) {
                    displayController.showTurns(activePlayer);
                    if(activePlayer === true) {
                        displayController.markBoard(players[0].choice, i);
                        activePlayer = false;
                    } else {                        
                        displayController.markBoard(players[1].choice, i);
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
                            game.getWinner = (players[0].choice === options[option]) ? 
                            `${players[0].name} is the winner!!`:
                            `${players[1].name} is the winner!!`;
                        };
                    };
                } else {
                    alert('This field has been taken already.');
                };
            });
        };
    });

    return {getWinner};
})();