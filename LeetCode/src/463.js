var islandPerimeter = function(grid) {
    const row = grid.length;
    const col= grid[0].length;
    
    const paddedGrid = new Array(row+2).fill(0).map(val => new Array(col+2).fill(0));
    for (let r = 1; r < (row+1); r++) {
        for (let c = 1; c < (col+1); c++) {
            paddedGrid[r][c] = grid[r-1][c-1];
        }
    }
    
    let answer = 0;
    
    for (let r = 1; r < (row+1); r++) {
        let tmp = 0;
        for (let c = 1; c < (col+2); c++) {
            if (paddedGrid[r][c-1] != paddedGrid[r][c]) { tmp += 1; }
        }
        answer += tmp;
    }
    
    for (let c = 1; c < (col+1); c++) {
        let tmp = 0;
        for (let r = 1; r < (row+2); r++) {
            if (paddedGrid[r-1][c] != paddedGrid[r][c]) { tmp += 1; }
        }
        answer += tmp;
    }
    
    return answer;
};
