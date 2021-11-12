var minStartValue = function(nums) {
    let minPrefix = 0;
    
    let prefixSum = 0;
    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];
        minPrefix = Math.min(minPrefix, prefixSum);
    }
    
    if (minPrefix > 0) {
        return 1;
    } else {
        return (-1 * minPrefix) + 1;
    }
};
