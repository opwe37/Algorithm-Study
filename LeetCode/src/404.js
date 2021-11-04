var sumOfLeftLeaves = function(root) {
    return dfs(root, false);
};

function dfs(root, isLeft) {
    if (!root) { return 0; }
    
    if (!root.left && !root.right && isLeft) {
        return root.val;
    }
    
    return dfs(root.left, true) + dfs(root.right, false);
}
