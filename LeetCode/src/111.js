var minDepth = function(root) {
    if (!root) return 0;
    
    let queue = [root];
    let depth = 1;
    while (queue.length != 0) {
        const next_depth = [];
        for (let node of queue) {
            if (!node.left && !node.right) {
                return depth;
            }
            
            if (node.left) {
                next_depth.push(node.left);
            }
            
            if (node.right) {
                next_depth.push(node.right);
            }
        }
        depth += 1;
        queue = next_depth;
    }
    return depth;
};
