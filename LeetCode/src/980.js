var uniquePathsIII = function(grid) {
    const visited = new Array(grid.length).fill(0).map(val => new Array(grid[0].length).fill(false));
    
    let numEmptyCell = 0;
    let startPoint = [];
    grid.forEach((row, rowIdx) => {
        row.forEach((val, colIdx) => {
            if (val == 1) {
                visited[rowIdx][colIdx] = true;
                startPoint = [rowIdx, colIdx];
            } else if (val == -1) {
                visited[rowIdx][colIdx] = true;
            } else if (val == 0) {
                numEmptyCell += 1;
            }
        });
    });
    
    let answer = dfs(grid, visited, numEmptyCell, startPoint);
    return answer;
};

function dfs(grid, visited, emptyCell, point) {
    const [curRow, curCol] = point;
    
    if (grid[curRow][curCol] == 2) {
        emptyCell += 1;
        if (emptyCell == 0) { return 1; }
        return 0;
    }
    
    let answer = 0;
    const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let i = 0; i < 4; i++) {
        const nextRow = curRow + dir[i][0];
        const nextCol = curCol + dir[i][1];
        
        if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length){
            continue;
        }
        if (visited[nextRow][nextCol]) { continue; }
        visited[nextRow][nextCol] = true;
        answer += dfs(grid, visited, emptyCell-1, [nextRow, nextCol]);
        visited[nextRow][nextCol] = false;
    }
    return answer;
}
