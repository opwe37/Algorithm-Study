function solution(sticker) {
    var answer = 0;
    
    const n = sticker.length;
    if (n == 1) return sticker[0];
    
    var dp = new Array(n).fill(0);
    
    dp[0] = sticker[0];
    dp[1] = dp[0];
    for (let i = 2; i < n-1; i++) {
        dp[i] = Math.max(dp[i-2]+sticker[i], dp[i-1]);
    }
    answer = dp[n-2];
    
    dp[0] = 0;
    dp[1] = sticker[1];
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i-2]+sticker[i], dp[i-1]);
    }
    answer = answer > dp[n-1] ? answer : dp[n-1];
    
    return answer;
}
