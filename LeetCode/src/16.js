var threeSumClosest = function(nums, target) {
    let diff = Infinity;
    nums = nums.sort((prev, next) => prev - next);
    
    for (let i = 0; i < nums.length && diff != 0; i++) {
        let lo = i+1, hi = nums.length-1;
        while (lo < hi) {
            const sum = nums[i] + nums[lo] + nums[hi];
            
            if (Math.abs(target - sum) < Math.abs(diff)) {
                diff = target - sum;
            }
            
            if (sum < target) {
                lo += 1;
            } else {
                hi -= 1;
            }
        }
    }
    
    return target - diff;
};
