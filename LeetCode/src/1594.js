var maxProductPath = function(grid) {
    const row = grid.length;
    const col = grid[0].length;
    
    let memo = new Array(row).fill(0).map(val => new Array(col).fill(0));
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            memo[i][j] = {h: -Infinity, l: Infinity}
        }
    }
    memo[0][0] = {h: grid[0][0], l: grid[0][0]}
    for (let i = 1; i < col; i++) {
        memo[0][i].h = grid[0][i] * memo[0][i-1].h;
        memo[0][i].l = memo[0][i].h;
    }
    for (let i = 1; i < row; i++) {
        memo[i][0].h = grid[i][0] * memo[i-1][0].h;
        memo[i][0].l = memo[i][0].h;
    }
    
    for (let r = 1; r < row; r++) {
        for (let c = 1; c < col; c++) {
            const h1 = memo[r-1][c].h, h2 = memo[r][c-1].h,
                  l1 = memo[r-1][c].l, l2 = memo[r][c-1].l
            
            memo[r][c].h = Math.max(h1 * grid[r][c], h2 * grid[r][c], l1 * grid[r][c], l2 * grid[r][c]);
            memo[r][c].l = Math.min(h1 * grid[r][c], h2 * grid[r][c], l1 * grid[r][c], l2 * grid[r][c]);
        }
    }
    
    return memo[row-1][col-1].h >= 0 ? memo[row-1][col-1].h % 1000000007 : -1;
};
