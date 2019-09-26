class TicTacToe {
    constructor() {
        this.board = Array.from({ length: 9 }, _ => ' ');
        this.counter = 0;
    }

    isThisEndOfGame() {
        const x = rows(this.board, 'xxx') || cols(this.board, 'xxx') || diag(this.board) === 'xxx' || diag2(this.board) === 'xxx';
        const o = rows(this.board, 'ooo') || cols(this.board, 'ooo') || diag(this.board) === 'ooo' || diag2(this.board) === 'ooo';
        return x ? 'x' : o ? 'o' : this.counter === 9 ? 'draw' : false;
    }

    getCurrentPlayerSymbol() {
        const symbols = 'xo';
        return symbols[this.counter % 2];
    }

    nextTurn(rowIndex, columnIndex) {
        const index = rowIndex * 3 + columnIndex;
        if (this.board[index] === ' ') {
            this.board[index] = this.getCurrentPlayerSymbol();
            this.counter++;
        }
    }

    isFinished() {
        return this.isThisEndOfGame() !== false;
    }

    getWinner() {
        let winner = this.isThisEndOfGame();
        if (winner === 'draw' || !winner) winner = null;
        return winner;
    }

    noMoreTurns() {
        return this.counter === 9;
    }

    isDraw() {
        return this.isThisEndOfGame() === 'draw';
    }

    getFieldValue(rowIndex, colIndex) {
        let symbol = this.board[rowIndex * 3 + colIndex];
        if (symbol === ' ') symbol = null;
        return symbol;
    }
}

module.exports = TicTacToe;

function row(board, line, index) {
    return board.join('').substr(index, 3) === line;
}
function col(board, line, index) {
    return row(transponate(board), line, index);
}
function rows(board, line) {
    return row(board, line, 0) || row(board, line, 3) || row(board, line, 6);
}
function cols(board, line) {
    return col(board, line, 0) || col(board, line, 3) || col(board, line, 6);
}
function diag(board) {
    return [board[0], board[4], board[8]].join('');
}
function diag2(board) {
    return [board[2], board[4], board[6]].join('');
}

function transponate(board, n = 3) {
    let array = [];
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            array[j * n + i] = board[i * n + j];
        }
    }
    return array;
}
