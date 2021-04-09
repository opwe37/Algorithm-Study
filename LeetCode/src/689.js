var maxSumOfThreeSubarrays = function(nums, k) {
    const n = nums.length - k + 1;
    const arr_sum = Array(n).fill(0);
    let cur_sum = 0
    for (let i = 0; i < nums.length; i++) {
        cur_sum += nums[i];
        if (i >= k) {
            cur_sum -= nums[i - k];
        }
        if (i >= k - 1) {
            arr_sum[i - k + 1] = cur_sum;
        }
    }
    
    const dp = Array(3).fill(0).map(val => Array(n).fill([0, 0]));
    dp[0][0] = [arr_sum[0], 0]
    
    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i-1][0] < arr_sum[i] ? [arr_sum[i], i] : dp[0][i-1];
    }
    for (let i = 0; i < n; i++) {
        if (i < k) {
            dp[1][i] = dp[0][i];
            continue;
        }
        dp[1][i] = arr_sum[i] + dp[0][i - k][0] > dp[1][i-1][0] ? [arr_sum[i] + dp[0][i - k][0], i] : dp[1][i-1];
    }
    for (let i = 0; i < n; i++) {
        if (i < 2*k) {
            dp[2][i] = dp[1][i];
            continue;
        }
        dp[2][i] = arr_sum[i] + dp[1][i - k][0] > dp[2][i-1][0] ? [arr_sum[i] + dp[1][i - k][0], i] : dp[2][i-1];
    }
    
    const result = Array(3);
    result[2] = dp[2][n-1][1];
    result[1] = dp[1][result[2] - k][1]
    result[0] = dp[0][result[1] - k][1]
        
    return result;
};
