var sumNumbers = function(root) {
    let answer = 0;
    
    function dfs(root, str) {
        if (!root) { return; }

        str += root.val;
        
        if (!root.left && !root.right) {
            answer += Number(str);
            return;
        }
        
        dfs(root.left, str);
        dfs(root.right, str);
    }
    
    dfs(root, '');
    
    return answer;
};
