// using inorder traversal + list

var isValidBST1 = function(root) {
    let arr = treeToArray(root, []);

    if (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i+1]) { return false; }
    }

    return true;
}

function treeToArray(root, result) {
    if (root.left != null) {
        treeToArray(root.left, result);
    }

    result.push(root.val);

    if (root.right != null) {
        treeToArray(root.right, result);
    }

    return result;
}

// ================================================================================

// using inorder traversal

var isValidBST2 = function(root) {
    
    let last_printed = null;
    
    var chkBST = function(root) {
        if (root == null) return true;
        
        if (!chkBST(root.left)) return false;
        
        if (last_printed != null && root.val <= last_printed) {
            return false;
        }
        last_printed = root.val;
        
        if (!chkBST(root.right)) return false;
        
        return true;
    }
    
    return chkBST(root)
};
