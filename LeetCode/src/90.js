var subsetsWithDup = function(nums) {
    const arr = nums.slice();
    arr.sort((a, b) => a - b);
    
    const powerSet = new Set();
    const subsets = [];
    
    function findSubset(arr, idx, ans, limit) {
        if (limit == 0) { 
            const key = ans.join('');
            if (powerSet.has(key)) { return; }
            powerSet.add(key);
            subsets.push(ans.slice());
            return;
        }
        
        for (let i = idx; i < arr.length; i++) {
            ans.push(arr[i]);
            permulate(arr, i+1, ans, limit-1);
            ans.pop();
        }
    }
    
    for (let i = 0; i <= arr.length; i++) {
        findSubset(arr, 0, [], i)   
    }
    
    return subsets;
};
