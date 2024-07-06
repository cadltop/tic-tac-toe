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
    const showBoard = function() {
        for(let i = 0; i < gridSquares.length; i++) {
            gridSquares[i].innerHTML = gameBoard.board[i];
        };
    };
    return {gridSquares, choiceButtons, showBoard};
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
        console.log(gameBoard.board);

        // get choices
        let humanPosition;
        for(let i = 0; i < displayController.gridSquares.length; i++) {
            displayController.gridSquares[i].addEventListener('click', () => {
                humanPosition = i;
                if(gameBoard.board[humanPosition] !== human.choice && gameBoard.board[humanPosition] !== computer.choice) {
                    gameBoard.board[humanPosition] = human.choice;
                    displayController.gridSquares[humanPosition].innerHTML = human.choice;
                    let computerPosition = Math.round((Math.random() * 7) + 1);
                    if(gameBoard.board[computerPosition] !== human.choice && gameBoard.board[computerPosition] !== computer.choice) {
                        gameBoard.board[computerPosition] = computer.choice;
                        displayController.gridSquares[computerPosition].innerHTML = computer.choice;
                        console.log(gameBoard.board);
                    } else {
                        while(gameBoard.board[computerPosition] === human.choice || gameBoard.board[computerPosition] === computer.choice) {
                            computerPosition = Math.round((Math.random() * 7) + 1);
                        };
                        gameBoard.board[computerPosition] = computer.choice;
                        displayController.gridSquares[computerPosition].innerHTML = computer.choice;
                        console.log(gameBoard.board);
                    };
                    displayController.showBoard();
                    
                    // rules of game
                    for(let option in options) {
                        for(let i = 0; i <= 6; i+=3){
                            if(gameBoard.board[i] === options[option] && 
                                gameBoard.board[i+1] === options[option] && 
                                gameBoard.board[+2] === options[option]) {
                                getWinner = (human.choice === options[option]) ? 
                                `${human.name} is the winner!!`:
                                `${computer.name} is the winner!!`;
                            };
                        };
                        for(let i = 0; i <= 2; i++){
                            if(gameBoard.board[i] === options[option] && 
                                gameBoard.board[i+3] === options[option] && 
                                gameBoard.board[i+6] === options[option]) {
                                getWinner = (human.choice === options[option]) ? 
                                `${human.name} is the winner!!`:
                                `${computer.name} is the winner!!`;
                            };
                        };
                        if(gameBoard.board[0] === options[option] && 
                            gameBoard.board[4] === options[option] && 
                            gameBoard.board[8] === options[option]) {
                            getWinner = (human.choice === options[option]) ? 
                            `${human.name} is the winner!!`:
                            `${computer.name} is the winner!!`;
                        };
                        if(gameBoard.board[2] === options[option] && 
                            gameBoard.board[4] === options[option] && 
                            gameBoard.board[6] === options[option]) {
                            getWinner = (human.choice === options[option]) ? 
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

console.log(game.getWinner);