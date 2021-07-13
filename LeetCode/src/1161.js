var maxLevelSum = function(root) {
    let ans = 0;
  
    let maxSum = -Infinity;
    let q = [root];
    let level = 1;
  
    while (q.length) {
        let sumOfSameLevel = 0;
        
        const nextQ = [];
        for (let i = 0; i < q.length; i++) {
            const node = q[i];
            
            sumOfSameLevel += node.val;
            
            if (node.left != null) { nextQ.push(node.left); }
            if (node.right != null) { nextQ.push(node.right); }
        }
        
        if (maxSum < sumOfSameLevel) {
            maxSum = sumOfSameLevel;
            ans = level; 
        }
        
        q = nextQ;
        level += 1;
    }
  
    return ans;
};
