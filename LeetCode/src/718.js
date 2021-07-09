//================================ Brute Force ================================

var findLength_bf = function(nums1, nums2) {
    let ans = 0;
    
    for (let i = 0; i < nums1.length; i++) {
        const tmp1 = compareTo(nums1, nums2, i);
        const tmp2 = compareTo(nums2, nums1, i);
        ans = Math.max(ans, tmp1, tmp2);
    }
    
    return ans;
};

var compareTo = function(nums1, nums2, start) {
    let maxCount = 0;
    
    let tmpCount = 0;
    let j = 0;
    
    for (let i = start; i < nums1.length; i++) {
        if (j >= nums2.length) { break; }
        if (nums1[i] == nums2[j]) {
            tmpCount += 1;
            maxCount = Math.max(maxCount, tmpCount);
        } else {
            tmpCount = 0; 
        }
        j += 1;
    }
    
    return maxCount;
}


//================================ DP ================================

var findLength_dp = function(nums1, nums2) {
    let ans = 0;
    const dp = Array(nums2.length+1).fill(0).map(val => Array(nums1.length+1).fill(0));
    
    for (let i = nums1.length-1; i >= 0; i--) {
        for (let j = nums2.length-1; j >= 0; j--) {
            if (nums1[i] == nums2[j]) { 
                dp[j][i] = dp[j+1][i+1] + 1;
                ans = Math.max(ans, dp[j][i]);
            }
        }
    }
    
    return ans
};
