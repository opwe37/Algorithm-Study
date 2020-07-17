function solution(n, money) {
    var answer = 0;
    
    var dp = new Array(n+1).fill(0);
    dp[0] = 1;
    for (let i = money[0]; i < n+1; i+=money[0]){
        dp[i] = 1;
    }
    
    for (let i = 1; i < money.length; i++) {
        for (let j = 0; j < n+1; j++) {
            if (j >= money[i])  dp[j] += dp[j-money[i]] % 1000000007;
        }
    }

    return answer = dp[n];
}
