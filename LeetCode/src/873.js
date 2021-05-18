var lenLongestFibSubseq = function(arr) {
    const index = new Map();
    arr.forEach((val, key) => index[val] = key)
    
    const dp = new Array(arr.length).fill(0).map(val => new Array(arr.length).fill(0));
    
    let answer = 0;
    for (let k = 0; k < arr.length; k++) {
        for (let j = 0; j < k; j++) {
            let i = index[arr[k]-arr[j]] ?? -1;
            if (i >= 0 && i < j) {
                const cand = (dp[i][j] > 2 ? dp[i][j] : 2) + 1;
                dp[j][k] = cand;
                answer = Math.max(answer, cand);
            }
        }
    }
    
    return answer >= 3 ? answer : 0;
};
