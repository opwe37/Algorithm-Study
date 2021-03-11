var combinationSum = function(candidates, target) {
    const result = [];
    
    function dfs(elements, start, k) {
        if (k <= 0) {
            if (k == 0) result.push(elements.slice());
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            elements.push(candidates[i]);
            dfs(elements, i, k - candidates[i]);
            elements.pop();
        }
    }
    
    dfs([], 0, target);
    return result;
};
