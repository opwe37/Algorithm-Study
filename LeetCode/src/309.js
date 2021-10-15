var maxProfit = function(prices) {
    const dp = new Array(prices.length).fill(0);
    
    for (let sp = 1; sp < prices.length; sp++) {
        dp[sp] = dp[sp-1];
        for (let bp = 0; bp < sp; bp++) {
            if (bp-2 >= 0) {
                dp[sp] = Math.max(dp[sp], prices[sp] - prices[bp] + dp[bp-2]);
            } else {
                dp[sp] = Math.max(dp[sp], prices[sp] - prices[bp]);
            }
        }
    }
    
    return dp[prices.length-1];
};
