var maxLength = function(arr) {
    let answer = 0;
    
    function dfs(idx, hmap) {
        if (idx == arr.length) {
            answer = Math.max(answer, hmap.size);
            return;
        }
        
        dfs(idx+1, new Map(hmap));
        const tmp = new Map(hmap);
        for (let i = 0; i < arr[idx].length; i++) {
            if (tmp.has(arr[idx][i])) { return; }
            tmp.set(arr[idx][i], 1);
        }
        dfs(idx+1, tmp);
    }
    
    dfs(0, new Map());
    
    return answer;
};
