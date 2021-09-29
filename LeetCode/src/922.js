var sortArrayByParityII = function(nums) {
    let odd = 1, even = 0;
    while (odd < nums.length && even <nums.length) {
        while (odd < nums.length && nums[odd] % 2 == 1) { odd += 2; }
        while (even <nums.length && nums[even] % 2 == 0) { even += 2; }
        
        if (even < nums.length && odd < nums.length) {
            [nums[odd], nums[even]] = [nums[even], nums[odd]];
        }
    }
    return nums;
};
