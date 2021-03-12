var searchBST = function(root, val) {
    let node = root;
    while (node != null && node.val != val) {
        node = node.val > val ? node.left : node.right;
    }
    return node;
};
