var maxProduct = function(root) {
    const sumTree = buildTree(root);
    const totalSum = sumTree.val;
    const MOD = 1000000007;
    
    let maxVal = 0;
    function findMaxProduct(root) {
        if (!root) { return; }
        
        const cutLeft = root.left ? (totalSum - root.left.val) * root.left.val : 0;
        const cutRight = root.right ? (totalSum - root.right.val) * root.right.val : 0;
        
        maxVal = Math.max(maxVal, cutLeft, cutRight);
        
        findMaxProduct(root.left);
        findMaxProduct(root.right);
    }
    
    findMaxProduct(sumTree);
    
    return maxVal % MOD;
};

var buildTree = function(root) {
    const node = new TreeNode();
    
    node.left = root.left ? buildTree(root.left) : null;
    node.right = root.right ? buildTree(root.right) : null;
    
    node.val = root.val + (node.left ? node.left.val : 0) + (node.right ? node.right.val : 0);
    
    return node;
}
