// 이진 탐색 트리의 탐색을 이용한 방법

var findTarget = function(root, k) {
    function searchTree(root, target) {
        if (root == null) { return false; }
        if (root.val == target) { return true; }
        
        if (target > root.val) {
            return root.right ? searchTree(root.right, target) : false;
        } else {
            return root.left ? searchTree(root.left, target) : false;
        }
    }
    
    const q = [root];
    while (q.length) {
        const node = q.shift();
        let searchResult = false;
        if (node.val != k - node.val) {
            searchResult =  k - node.val > node.val ? 
                                  searchTree(root, k - node.val) : 
                                  searchTree(root, k - node.val);
        }
        
        if (searchResult) { return true; }
        
        node.right ? q.push(node.right) : '';
        node.left ? q.push(node.left) : '';
    }
    
    return false;
};

// ===========================================
// 중위 순회와 투 포인터 기법을 이용한 방법

var findTarget = function(root, k) {
    const arr = [];
    inorder(root, arr);
    
    let l = 0, r = arr.length-1;
    while (l < r) {
        const sum = arr[l] + arr[r];
        if (sum == k) { return true; }
        
        if (sum > k) {
            r -= 1;
        } else {
            l += 1;
        }
    }
    return false;
};

var inorder = function(root, arr) {
    root.left ? inorder(root.left, arr) : '';
    arr.push(root.val);
    root.right ? inorder(root.right, arr) : '';
}
