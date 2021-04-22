var findMaxConsecutiveOnes_1 = function(nums) {
    let max_count = 0;
    
    let count = 0;
    let pre = 1;
    for (let i = 0; i < nums.length; i++) {
        if (pre && nums[i]) count++;
        pre = nums[i];
        
        if (nums[i] == 0 || i == nums.length-1) {
            max_count = Math.max(max_count, count);
            count = 0;
            pre = 1;
        }
    }
    
    return max_count;
};

var findMaxConsecutiveOnes_2 = function(nums) {
    let max_count = 0;
    
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] == 0) {
            l = r + 1;
        } else {
            max_count = Math.max(max_count, r - l + 1);
        }
    }
    
    return max_count;
};

var findMaxConsecutiveOnes_3 = function(nums) {
    let max_count = nums[0] == 1 ? 1 : 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] == 1) {
            nums[i] = nums[i] + nums[i-1];
        }
        max_count = Math.max(max_count, nums[i]);
    }
    
    return max_count;
};
