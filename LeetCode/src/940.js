var distinctSubseqII = function(S) {
    const MOD = 1000000007;
    
    const dp = new Array(S.length + 1);
    dp[0] = 1;
    
    const alpha_idx = new Array(26).fill(null);
    
    for (let i = 0; i < S.length; i++) {
        const idx = S[i].charCodeAt(0) - 'a'.charCodeAt(0);
        dp[i+1] = 2 * dp[i] % MOD;
        if (alpha_idx[idx] != null) {
            dp[i+1] -= dp[alpha_idx[idx]];
        }
        dp[i+1] %= MOD;
        alpha_idx[idx] = i;
    }
    dp[S.length] -= 1;
    if (dp[S.length] < 0) dp[S.length] += MOD;
    return dp[S.length];
};
