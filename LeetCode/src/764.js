var orderOfLargestPlusSign = function(n, mines) {
    let answer = 0;
    
    const grid = Array(n).fill(0).map(val => new Array(n).fill(1))
    
    for (let [row, col] of mines) {
        grid[row][col] = 0;
    }
         
    // 각 지점에서 좌우로 확장가능 한지 체크하여 그 크기 작성
    for (let i = 0; i < n; i++) {
        let count = 0
        for (let col = 0; col < n; col++) {
            count = grid[i][col] ? count + 1 : 0;
            grid[i][col] = count;
        }
        
        count = 0
        for (let col = n-1; col >= 0; col--) {
            count = grid[i][col] ? count + 1 : 0;
            grid[i][col] = Math.min(count, grid[i][col]);
        }
    }
    
    // 각 지점에서 상하로 확장가능 한지 체크하여 그 크기 작성
    for (let i = 0; i < n; i++) {
        let count = 0
        for (let row = 0; row < n; row++) {
            count = grid[row][i] ? count + 1 : 0;
            grid[row][i] = Math.min(count, grid[row][i]);
        }
        
        count = 0
        for (let row = n-1; row >= 0; row--) {
            count = grid[row][i] ? count + 1 : 0;
            grid[row][i] = Math.min(count, grid[row][i]);
            answer = Math.max(answer, grid[row][i]);
        }
    }
    
    return answer;
};
