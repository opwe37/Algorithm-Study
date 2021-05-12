// BFS + Greedy Approach
var minimumEffortPath_BFS = function(heights) {
    const row = heights.length,
          col = heights[0].length;
    const effort = new Array(row).fill(0).map(val => new Array(col).fill(Infinity));
    effort[0][0] = 0;
    
    const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    const queue = [[0, 0, 0, -1]];
    while (queue.length) {
        const [x, y, c, d] = queue.pop();
        
        if (x == row-1 && y == col-1) { return c; }
        
        for (let i = 0; i < 4; i++) {
            if (d != -1 && i == (d+2) % 4) { continue; }
            const next_x = x + move[i][0],
                  next_y = y + move[i][1];
            
            if (next_x < 0 || next_x >= row || next_y < 0 || next_y >= col) { continue; }
            
            const e = Math.max(c, Math.abs(heights[x][y] - heights[next_x][next_y]));
            if (effort[next_x][next_y] > e) {
                effort[next_x][next_y] = e;
                queue.push([next_x, next_y, e, i]);
                queue.sort((a, b) => b[2] - a[2]);
            }
        } 
    }
    
    return effort[row-1][col-1];
};

// ========================================================================================================
// Binary Search + DFS Approach
var minimumEffortPath_DFS = function(heights) {
    const row = heights.length,
          col = heights[0].length;
    let visited = [];
    
    function dfs(x, y, k) {
        visited[x][y] = true;
        
        for (let [i, j] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
            const n_x = x + i,
                  n_y = y + j;
            
            if (n_x < 0 || n_x >= row || n_y < 0 || n_y >= col || visited[n_x][n_y]) { continue; }
            
            if (k >= Math.abs(heights[n_x][n_y]-heights[x][y])) { dfs(n_x, n_y, k); }
        }
    }
    
    let l = 0, r = 1000000;
    while (l < r) {
        const mid = l + Math.floor((r - l) / 2);
        visited = new Array(row).fill(0).map(val => new Array(col).fill(false));
        
        dfs(0, 0, mid)
        if (visited[row-1][col-1]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    
    return l;
};
