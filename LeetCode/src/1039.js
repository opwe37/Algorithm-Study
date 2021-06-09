var minScoreTriangulation = function(values) {
    const dp = new Array(values.length).fill(0).map(val => new Array(values).fill(null));
    
    var calcMinScore = function (values, left, right) {
        if (left+2 > right) { return 0; }
        
        if (dp[left][right]) { return dp[left][right]; }
        
        if (right - 2 == left) {
            dp[left][right] = values[left]*values[left+1]*values[left+2];
            return dp[left][right];
        }

        let score = Infinity;
        for (let k = left+1; k < right; k++) {
            const score_1 = calcMinScore(values, left, k);
            const score_2 = calcMinScore(values, k, right);
            const cur = values[k] * values[left] * values[right];
            score = Math.min(score, score_1 + score_2 + cur);
        }
        
        dp[left][right] = score;
        
        return dp[left][right];
    }
    
    return calcMinScore(values, 0, values.length-1)
};
