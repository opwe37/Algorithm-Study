var increasingTriplet = function(nums) {
    if (nums.length < 3) return false;
    
    let min = Infinity,
        second_min = Infinity;
    for (let n of nums) {
        if (min >= n) min = n;
        else if (second_min > n) second_min = n;
        else if (second_min < n) return true;
    }
    return false;
};
