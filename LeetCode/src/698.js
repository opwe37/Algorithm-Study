var canPartitionKSubsets = function(nums, k) {
    let total = nums.reduce((acc, val) => acc + val, 0);
    if (total % k) { return false; }
    let target = total / k;
    
    nums = nums.sort((a, b) => b - a);
    
    const used = new Array(nums.length).fill(false);
    for (let i = 0; i < k; i++) {
        if (!findSubset(nums, used, 0, target)) {
            return false;
        }
    }
    
    return true;
};

var findSubset = function(arr, used, idx, target){
    if (target == 0) { return true }
    
    for (let i = idx; i < arr.length; i++) {
        if (used[i] || target - arr[i] < 0) { continue; }
        used[i] = true;
        if (findSubset(arr, used, i+1, target-arr[i])) {
            return true;
        }
        used[i] = false;
    }
    
    return false;
}
