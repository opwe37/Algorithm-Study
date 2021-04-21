var minCameraCover = function(root) {
    if (!root) return 0;
    
    let camera = 0;
    function helper(node) {
        const l = node.left != null ? helper(node.left) : null;
        const r = node.right != null ? helper(node.right) : null;
        
        if (l == -1 || r == -1) {
            camera += 1;
            return 1;
        }
        
        if (l == 1 || r == 1) {
            return 0;
        }
        
        return -1;
    }
    if (helper(root) == -1) {
        camera += 1;
    }
    return camera;
};
