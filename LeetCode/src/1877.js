var minPairSum = function(nums) {
    nums = nums.sort((a, b) => a - b);
    
    let maxVal = -Infinity;
    
    for (let left = 0; left < (nums.length/2); left++) {
        const right = nums.length - 1 - left;
        maxVal = Math.max(nums[left] + nums[right], maxVal);
    }
    
    return maxVal;
};
