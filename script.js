const gameBoard = (function() {
    let board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    return {board};
})();

function player(name, choice) {
    return {name, choice};
};

const game = (function() {
    let getWinner;
    const options = {
        cross: 'x',
        circle: 'o'
    };

    const humanChoice = prompt('Make a choice (x || o):', '');
    const computerChoice = humanChoice == options.cross ? options.circle : options.cross;

    const human = player('Human', humanChoice);
    const computer = player('Computer', computerChoice);

    const humanPosition = parseInt(prompt('Take a position (0-8)', ''));
    if(gameBoard.board[humanPosition] !== human.choice && gameBoard.board[humanPosition] !== computer.choice) {
        gameBoard.board[humanPosition] = human.choice;
        let computerPosition = Math.round((Math.random() * 7) + 1);
        if(gameBoard.board[computerPosition] !== human.choice && gameBoard.board[computerPosition] !== computer.choice) {
            gameBoard.board[computerPosition] = computer.choice;
            console.log(gameBoard.board);
        } else {
            while(gameBoard.board[computerPosition] === human.choice || gameBoard.board[computerPosition] === computer.choice) {
                computerPosition = Math.round((Math.random() * 7) + 1);
            };
            gameBoard.board[computerPosition] = computer.choice;
            console.log(gameBoard.board);
        };
    } else {
        alert('This field has been taken already');
    };
    return {getWinner};
})();