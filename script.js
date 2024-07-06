const gameBoard = (function() {
    let board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
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
    let getWinner;
    const options = {
        cross: 'x',
        circle: 'o'
    };
    let humanChoice;
    displayController.choiceButtons[0].addEventListener('click', () => {
        humanChoice = 'x';
        afterChoice();
    });
    displayController.choiceButtons[1].addEventListener('click', () => {
        humanChoice = 'o';
        afterChoice();
    });

    function afterChoice() {
        const computerChoice = (humanChoice == options.cross) ? options.circle : options.cross;

        const human = player('Human', humanChoice);
        const computer = player('Computer', computerChoice);

        // mark board
        for(let humanPosition = 0; humanPosition < displayController.gridSquares.length; humanPosition++) {
            displayController.gridSquares[humanPosition].addEventListener('click', () => {
                if(gameBoard.board[humanPosition] !== human.choice && gameBoard.board[humanPosition] !== computer.choice) {
                    displayController.markBoard(human.choice, humanPosition);

                    let computerPosition = Math.round((Math.random() * 7) + 1);
                    if(gameBoard.board[computerPosition] !== human.choice && gameBoard.board[computerPosition] !== computer.choice) {
                        displayController.markBoard(computer.choice, computerPosition);
                        console.log(gameBoard.board);
                    } else {
                        while(gameBoard.board[computerPosition] === human.choice || gameBoard.board[computerPosition] === computer.choice) {
                            computerPosition = Math.round((Math.random() * 7) + 1);
                        };
                        displayController.markBoard(computer.choice, computerPosition);
                        console.log(gameBoard.board);
                    };
                    
                    // rules of game
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
                            game.getWinner = (human.choice === options[option]) ? 
                            `${human.name} is the winner!!`:
                            `${computer.name} is the winner!!`;
                        };
                    };
                } else {
                    alert('This field has been taken already');
                };
            });
        };
    };
    
    return {getWinner};
})();
