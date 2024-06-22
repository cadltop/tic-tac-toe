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
    gameBoard.board[humanPosition] = human.choice;
    const computerPosition = Math.round((Math.random() * 7) + 1);
    gameBoard.board[computerPosition] = computer.choice;

    return {getWinner};
})();