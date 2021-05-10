/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    const visited = new Array(board.length+1).fill(false);
    visited[1] = true;
    
    let queue = [[1, 0]];
    while (queue.length != 0) {
        const cur = queue.shift();
        
        if (cur[0] == (board.length*board.length)) { return cur[1]; }
        
        for (let i = 1; i <= 6 && cur[0] + i <= board.length*board.length; i++) {
            const [next_x, next_y] = getCoordinate(board.length, cur[0] + i);
            const destination = board[next_x][next_y] == -1 ? cur[0] + i : board[next_x][next_y];
            
            if (!visited[destination]) {
                visited[destination] = true;
                queue.push([destination, cur[1] + 1]);
            }
        }
    }
    
    return -1;
};

function getCoordinate(n, cur_square) {
    const row = n - 1 - Math.floor((cur_square -1) / n)
    let col = (cur_square-1) % n;
    
    if ((n % 2 == 1 && row % 2 == 1) || (n % 2 == 0 && row % 2 == 0)) {
        col = n - 1 - col;
    }
    
    return [row, col];
}
