/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
    if (trust.length == 0 && N == 1) return 1;
    
    const reliability = Array(N+1).fill(1);
    trust.forEach(t => {
        reliability[t[0]] = false;
        if (reliability[t[1]] != false) reliability[t[1]] += 1;
    });
    for (let i = 1; i <= N; i++) {
        if (reliability[i] && reliability[i] == N) return i;
    }
    return -1;
};
