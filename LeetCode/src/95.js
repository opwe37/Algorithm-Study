var generateTrees = function(n) {
    const A = Array(n).fill(0).map((val, idx) => idx+1);
    
    function buildTree(arr) {
        if (arr.length == 0) {
            return [null]
        }
        
        let answer = []
        
        let candidateOfLeft = [];
        let candidateOfRight = [];
        for (let i = 0; i < arr.length; i++) {
            let root = new TreeNode(arr[i])
            candidateOfLeft = buildTree(arr.slice(0, i));
            candidateOfRight = buildTree(i+1 < arr.length ? arr.slice(i+1) : []);
            
            for (let left of candidateOfLeft){
                root.left = left;
                for (let right of candidateOfRight) {
                    root.right = right;
                    
                    answer.push(JSON.parse(JSON.stringify(root)))
                }
            }
        }
        
        return answer;
    }
    
    return buildTree(A);
};
