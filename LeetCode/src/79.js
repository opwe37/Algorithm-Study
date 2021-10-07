var exist = function(board, word) {
    const m = board.length;
    const n = board[0].length;
    
    // visited: 이전 과정에서 지나왔던 위치를 다시 한번 방문하는 것을 방지하기 위한 배열 
    const visited = new Array(m).fill(0).map(val => new Array(n).fill(false));
    function dfs(idx, [row, col]) {
        // 현재 위치 방문 체크
        visited[row][col] = true;
        
        let result = false;
        // 현 위치로부터 상하좌우 확인
        const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        for (let i = 0; i < 4; i++) {
            const nr = row + move[i][0];
            const nc = col + move[i][1];
            
            // board 밖이거나, 방문 했으면 패스
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
                continue;
            }
            // 갈수는 있지만, 찾는 알파벳이 아니면 패스
            if (word[idx] != board[nr][nc]) { continue; }
            
            // 현재 찾은 알파벳이 찾아야하는 마지막 알파벳이면 결과 반환
            if (idx == word.length-1) { return true; }
            // 전체 알파벳을 다 찾을 때까지 재귀호출
            result = result || dfs(idx+1, [nr, nc]);
        }
        
        // 현재 위치 방문 해제
        visited[row][col] = false;
        return result;
    }
    
    let answer = false;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!answer && board[i][j] == word[0]) {
                if (word.length == 1) { return true; }
                answer = dfs(1, [i, j]);
            }
        }
    }
    return answer;
};
