var solve = function(board) {
    const M = board.length;
    const N = board[0].length;
    
    const chkBoard = new Array(M).fill(0).map(val => new Array(N).fill('X'));
    
    for (let i = 0; i < N; i++) {
        if (board[0][i] === 'O' && chkBoard[0][i] === 'X') { bfs(board, chkBoard, [0, i]); }
        if (board[M-1][i] === 'O' && chkBoard[M-1][i] === 'X') { bfs(board, chkBoard, [M-1, i]); }
    }
    
    for (let i = 1; i < M-1; i++) {
        if (board[i][0] === 'O' && chkBoard[i][0] === 'X') { bfs(board, chkBoard, [i, 0]); }
        if (board[i][N-1] === 'O' && chkBoard[i][N-1] === 'X') { bfs(board, chkBoard, [i, N-1]); }
    }
    
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] !== chkBoard[i][j]) { board[i][j] = chkBoard[i][j]; }
        }
    }
};

function bfs(board, chkBoard, [row, col]) {
    const q = [[row, col]];
    chkBoard[row][col] = 'O';
    
    const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    while(q.length) {
        const cur = q.shift();
        
        dir.forEach(d => {
            const nextRow = cur[0] + d[0];
            const nextCol = cur[1] + d[1];
            
            if (nextRow < 0 || nextRow >= board.length || nextCol < 0 || nextCol >= board[0].length) {
                return;
            }
            if (chkBoard[nextRow][nextCol] === 'O' || board[nextRow][nextCol] === 'X') return;
            
            chkBoard[nextRow][nextCol] = 'O';
            q.push([nextRow, nextCol]);
        });
    }
    
    return chkBoard;
}
