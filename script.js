const gameBoard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {board};
})();

function player(name, symbol) {
    return {name, symbol};
};

const displayController = (function() {
    const gridSquares = document.querySelectorAll('.grid > *');
    const startButton = document.querySelector('form > button');
    const restartButton = document.querySelector('.restart');

    const markBoard = function(players, position, activePlayer) {
        let symbol;
        if(activePlayer === true) {
            symbol = players[0].symbol
            activePlayer = false;
        } else {                        
            symbol = players[1].symbol
            activePlayer = true;
        }
        gameBoard.board[position] = symbol;
        gridSquares[position].innerHTML = symbol;
        changeTurns(activePlayer);

        return activePlayer;
    };
    const resetBoard = function() {
        for(let i = 0; i < 9; i++) {
            gameBoard.board[i] = '';
            displayController.gridSquares[i].innerHTML = '';
        }
        changeTurns(true);
        showWinner('');
    };
    const setPlayersData = function() {
        const playersNamesTexts = document.querySelectorAll('input[name="name"]');
        const player1SymbolRadios = document.querySelectorAll('input[name="symbol"]');
        const playersNamesCells = document.querySelectorAll('tbody > tr > td.name');
        const playersSymbolCells = document.querySelectorAll('tbody > tr > td.symbol');

        playersNamesCells[0].innerHTML = playersNamesTexts[0].value;
        playersNamesCells[1].innerHTML = playersNamesTexts[1].value;

        if(player1SymbolRadios[0].checked === true) {
            const player1 = player(playersNamesTexts[0].value, 'x');
            const player2 = player(playersNamesTexts[1].value, 'o');
            setSymbolsAndTurn(player1, player2);
            return [player1, player2]
        } else if(player1SymbolRadios[1].checked === true) {
            const player1 = player(playersNamesTexts[0].value, 'o');
            const player2 = player(playersNamesTexts[1].value, 'x');
            setSymbolsAndTurn(player1, player2);
            return [player1, player2]
        };
        function setSymbolsAndTurn(player1, player2) {
            playersSymbolCells[0].innerHTML = player1.symbol;
            playersSymbolCells[1].innerHTML = player2.symbol;
            changeTurns(true);
        }
    };
    const showWinner = function(winner) {
        document.querySelector('.display').innerHTML = winner;
    };

    function changeTurns(activePlayer) {
        const playersTurnCells = document.querySelectorAll('tbody > tr > td.turn');
        if(activePlayer === true) {
            playersTurnCells[0].innerHTML = "It's your turn!!";
            playersTurnCells[1].innerHTML = "";
        } else {
            playersTurnCells[1].innerHTML = "It's your turn!!";
            playersTurnCells[0].innerHTML = "";
        };
    };
    
    return {gridSquares, startButton, restartButton, markBoard, resetBoard, setPlayersData, showWinner};
})();

const game = (function() {
    let winner, activePlayer = true;
    const symbols = {
        cross: 'x',
        circle: 'o'
    };

    displayController.startButton.addEventListener('click', () => {
        const players = displayController.setPlayersData();
        for(let i = 0; i < displayController.gridSquares.length; i++) {
            displayController.gridSquares[i].addEventListener('click', () => {
                if(gameBoard.board[i] !== players[0].symbol && gameBoard.board[i] !== players[1].symbol) {
                   activePlayer = displayController.markBoard(players, i, activePlayer);

                    for(let symbol in symbols) {
                        for(let i = 0; i <= 6; i+=3){
                            if(gameBoard.board[i] === symbols[symbol] && 
                                gameBoard.board[i+1] === symbols[symbol] && 
                                gameBoard.board[+2] === symbols[symbol]) {
                                getWinner();
                            };
                        };
                        for(let i = 0; i <= 2; i++){
                            if(gameBoard.board[i] === symbols[symbol] && 
                                gameBoard.board[i+3] === symbols[symbol] && 
                                gameBoard.board[i+6] === symbols[symbol]) {
                                getWinner();
                            };
                        };
                        if((gameBoard.board[0] === symbols[symbol] && 
                            gameBoard.board[4] === symbols[symbol] && 
                            gameBoard.board[8] === symbols[symbol]) ||
                            (gameBoard.board[2] === symbols[symbol] && 
                            gameBoard.board[4] === symbols[symbol] && 
                            gameBoard.board[6] === symbols[symbol])) {
                            getWinner();
                        };
                        
                        function getWinner() {   
                            game.winner = (players[0].symbol === symbols[symbol]) ? 
                            `${players[0].name} is the winner!!`:
                            `${players[1].name} is the winner!!`;
                            displayController.showWinner(game.winner);
                        };
                    };
                } else {
                    alert('This field has been taken already.');
                };
            });
        };
    });

    displayController.restartButton.addEventListener('click', () => {
        displayController.resetBoard();
        activePlayer = true;
        game.winner = undefined;
    });
    
    return {winner};
})();