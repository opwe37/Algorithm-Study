var bstFromPreorder = function(preorder) {
    let answer = null;
    
    function buildTree(arr) {
        if (arr.length == 0) { return null; }
        
        const left = arr.filter(val => val < arr[0]);
        const right = arr.filter(val => val > arr[0]);
        
        return new TreeNode(arr[0], buildTree(left), buildTree(right));
    }
    
    answer = buildTree(preorder);

    return answer;
};
