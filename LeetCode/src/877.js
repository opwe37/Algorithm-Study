var stoneGame = function(piles) {
    const N = piles.length;
    const dp = new Array(N).fill(0).map(val => new Array(N).fill(0));
    
    var play = function(piles, i, j) {
        if (i == j) {
            return piles[i];
        }
        
        if (dp[i][j]) { return dp[i][j]; }
        
        let sum = 0;
        for (let s = i; s <= j; s++) { sum += piles[s]; }
        
        const takeLeft = sum - (dp[i+1][j] ? dp[i+1][j] : play(piles, i+1, j));
        const takeRight = sum - (dp[i][j-1] ? dp[i][j-1] : play(piles, i, j-1));
        
        dp[i][j] = Math.max(takeLeft, takeRight);
        
        return dp[i][j];
    }
    
    const totalStone = piles.reduce((a, b) => a + b);
    
    play(piles, 0, N-1);
    
    return dp[0][N-1] > (totalStone/2);
};
