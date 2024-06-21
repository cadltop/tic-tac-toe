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

    let humanChoice = prompt('Make a choice (x || o):', '');
    let computerChoice = humanChoice == options.cross ? options.circle : options.cross;

    const humanPlayer = player('Human', humanChoice);
    const computerPlayer = player('Computer', computerChoice);

    return {getWinner};
})();