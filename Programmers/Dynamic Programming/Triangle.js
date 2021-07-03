function solution(triangle) {
    var answer = 0;

    var dp = [];
    function findMax(level, idx) {
        if (dp[level][idx] != -1) {return dp[level][idx];}

        if (idx == 0) {
            dp[level][idx] = findMax(level-1, idx) + triangle[level][idx];
        } else if (idx == (triangle[level].length-1)) {
            dp[level][idx] = findMax(level-1, idx-1) + triangle[level][idx];
        } else {
            var preLeft = findMax(level-1, idx-1);
            var preRight = findMax(level-1, idx);
            
            if (preLeft > preRight) {
              dp[level][idx] = preLeft + triangle[level][idx];
            } else {
              dp[level][idx] = preRight + triangle[level][idx];
            }
        }
        
        return dp[level][idx];
    }

    triangle.forEach(val => {
        dp.push(new Array(val.length).fill(-1));
    });
    dp[0][0] = triangle[0][0];
    
    for (let idx = 0; idx < triangle[triangle.length-1].length; idx++) {
    findMax(triangle.length-1, idx);
    }

    answer = Math.max.apply(null, dp[dp.length-1]);

    return answer;
}
