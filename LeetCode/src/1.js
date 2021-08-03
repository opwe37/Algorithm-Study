var twoSum = function(nums, target) {
    const list = nums.map((val, idx) => [val, idx])
    
    list.sort((a, b) => a[0] - b[0]);
    
    let lo = 0, hi = nums.length-1;
    while (list[lo][0] + list[hi][0] != target) {
        if (list[lo][0] + list[hi][0] > target) { hi -= 1; }
        else                                    { lo += 1; }
    }
    
    return [list[lo][1], list[hi][1]];
};
