var isBalanced = function(root) {
    if (root == null) return true;
    
    let answer = true;
    
    dfs = (root) => {
        if (root.left == null && root.right == null) { return 0; }
        
        const l_sub = root.left != null ? dfs(root.left) + 1 : 0;
        const r_sub = root.right != null ? dfs(root.right) + 1 : 0;
        
        if (Math.abs(l_sub - r_sub) > 1) { answer = false; }
        
        return Math.max(l_sub, r_sub);
    }
    
    dfs(root);
    
    return answer;
};
