var isCousins = function(root, x, y) {
    const xInfo = {}
    const yInfo = {}
    
    function dfs(root, parent, depth) {
        if (!root) { return; }
        if (root.val === x) {
            xInfo.parent = parent;
            xInfo.depth = depth;
        }
        if (root.val === y) {
            yInfo.parent = parent;
            yInfo.depth = depth;
        }
        
        dfs(root.left, root.val, depth+1);
        dfs(root.right, root.val, depth+1);
        
        return;
    }
    
    dfs(root, -1, 0);
    
    if (xInfo.depth === yInfo.depth && xInfo.parent !== yInfo.parent) {
        return true;
    }
    
    return false;
};
