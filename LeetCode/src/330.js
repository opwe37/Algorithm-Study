var minPatches = function(nums, n) {
    let answer = 0;
    
    let covered = 0;
    let i = 0;
    
    while (covered < n) {
        if (i >= nums.length || nums[i] > covered + 1) {
            answer += 1;
            covered += (covered + 1)
        } else {
            covered += nums[i];
            i += 1;
        }
    }
    
    return answer;
};
