var longestOnes = function(nums, k) {
    let ans = -Infinity;
    
    let zeroNum = 0;
    
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] == 0) {
            if (zeroNum < k) {
                zeroNum += 1;
            } else {
                if (nums[left] == 1) {
                    left += 1;
                    while (left < right && nums[left]) { left += 1; }
                }
                left += 1;
            }
        }
        
        ans = Math.max(right - left + 1, ans);
    }
    
    return ans;
};
