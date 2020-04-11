function solution(m, n, board) {
    var answer = 0;

    var gameBoard = createGameBoard(m, board);
    var pangResult = blockPang(m, n, gameBoard);

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (pangResult[i][j] == 0)  answer++;
        }
    }

    return answer;
}

function createGameBoard(m, board) {
    var gameBoard = [];
    for (var i = 0; i < m; i++) {
        var row = board[i].split('');
        gameBoard.push(row);
    }
    return gameBoard;
}

function blockPang(m, n, board) {
    var pangIndex = Array(m).fill(0).map(()=> Array(n).fill(0));
    var flag = true;
    for (var i = 0; i < (m-1); i++) {
        for (var j = 0; j < (n-1); j++) {
            if (board[i][j] != 0 && board[i][j] == board[i+1][j] && board[i][j] == board[i][j+1] && board[i][j] == board[i+1][j+1]) {
                pangIndex[i][j] = 1;
                flag = false;
            }
        }
    }

    if (flag) return board;

    for (var i = 0; i < (m-1); i++) {
        for (var j = 0; j < (n-1); j++) {
            if (pangIndex[i][j] == 1) {
                board[i][j] = 0;
                board[i][j+1] = 0;
                board[i+1][j] = 0;
                board[i+1][j+1] = 0;
            }
        }
    }

    return blockPang(m, n, rearrangementBoard(m, n, board));
}

function rearrangementBoard(m, n, board) {
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++ ) {
            if (board[i][j] == 0) board = downBlock(i, j, board)
        }
    }
    return board;
}

function downBlock(i, j, board) {
    while(i >= 0) {
        if (i == 0) {
            board[i][j] = 0;
        } else {
            board[i][j] = board[i-1][j];
        }
        i--;
    }
    return board;
}
