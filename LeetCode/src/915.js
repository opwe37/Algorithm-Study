var partitionDisjoint = function(nums) {
    let left = 0,
        leftMax = 0;
    
    let tmpMax = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[leftMax] > nums[i]) { 
            left = i;
            leftMax = tmpMax;
        }
        if (nums[tmpMax] < nums[i]) {
            tmpMax = i
        }
    }
    
    return left + 1;
};
