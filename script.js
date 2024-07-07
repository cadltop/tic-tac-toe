const gameBoard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {board};
})();

function player(name, choice) {
    return {name, choice};
};

const displayController = (function() {
    const gridSquares = document.querySelectorAll('.grid > *');
    const choiceButtons = document.querySelectorAll('.choices > *');

    const markBoard = function(playerChoice, playerPosition) {
        gameBoard.board[playerPosition] = playerChoice;
        gridSquares[playerPosition].innerHTML = gameBoard.board[playerPosition];
        displayController.gridSquares[playerPosition].innerHTML = playerChoice;
    };

    return {gridSquares, choiceButtons, markBoard};
})();

const game = (function() {
    let getWinner, activePlayer = true;
    const options = {
        cross: 'x',
        circle: 'o'
    };

    displayController.choiceButtons[0].addEventListener('click', () => {
        afterChoice(options.cross, options.circle);
    });
    displayController.choiceButtons[1].addEventListener('click', () => {
        afterChoice(options.circle, options.cross);
    });

    function afterChoice(player1Choice, player2Choice) {
        const player1 = player('Player 1', player1Choice);
        const player2 = player('Player 2', player2Choice);

        for(let i = 0; i < displayController.gridSquares.length; i++) {
            displayController.gridSquares[i].addEventListener('click', () => {
                if(gameBoard.board[i] !== player1.choice && gameBoard.board[i] !== player2.choice) {
                    if(activePlayer === true) {
                        displayController.markBoard(player1.choice, i);
                        activePlayer = false;
                    } else {
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
