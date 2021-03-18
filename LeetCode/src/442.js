var findDuplicates = function(nums) {
    const result = [];
    for (let num of nums) {
        const n = Math.abs(num);
        (nums[n-1] > 0) ? nums[n-1] *= -1 : result.push(n);
    }
    return result;
};
