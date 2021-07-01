var lowestCommonAncestor = function(root, p, q) {
    let ancestor = null;
    
    function dfs(root, p, q) {
        if (ancestor != null) { return [0, 0]; }
        
        const left = root.left != null ? dfs(root.left, p, q) : [false, false];
        const right = root.right != null ? dfs(root.right, p, q) : [false, false];
        
        const cur = [0, 0];
        cur[0] = (root.val == p.val) | left[0] | right[0];
        cur[1] = (root.val == q.val) | left[1] | right[1];
        
        if (ancestor == null && cur[0] && cur[1]) { ancestor = root; }
        
        return cur;
    }
    
    dfs(root, p, q);
    
    return ancestor;
};
