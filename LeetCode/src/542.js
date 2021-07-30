var updateMatrix = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    
    const ans = new Array(m).fill(0).map(val => new Array(n).fill(Infinity));
    const queue = [];
    for (let i = 0; i < m; i++) {       // i: row
        for (let j = 0; j < n; j++) {   // j: column
            if (mat[i][j] == 0) { 
                ans[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }
    
    const move = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (queue.length) {
        let [curRow, curCol] = queue.shift();
        
        for (let i = 0; i < 4; i++) {
            let nextRow = curRow + move[i][0];
            let nextCol = curCol + move[i][1];
            
            if (nextRow >= 0 && nextRow < m && nextCol >= 0 && nextCol < n) {
                if (mat[nextRow][nextCol] == 0) { continue; }
                
                if (ans[nextRow][nextCol] > ans[curRow][curCol] + 1) {
                    ans[nextRow][nextCol] = ans[curRow][curCol] + 1;
                    queue.push([nextRow, nextCol]);
                }
            }
        }
    }
    
    return ans;
};
