var soupServings = function(N) {
    if (N >= 4800) return 1;
    
    const operations = [[-100, 0], [-75, -25], [-50, -50], [-25, -75]];
    const memo = new Map();
    var dfs = function(a_volume, b_volume) {
        if (a_volume <= 0 && b_volume <= 0) return 0.5;
        if (a_volume <= 0) return 1;
        if (b_volume <= 0) return 0;
        
        const key = a_volume + ':' + b_volume;
        if (memo.has(key)) return memo.get(key);
        
        let prob = 0;
        for (let [served_a, served_b] of operations) {
            prob += dfs(a_volume+served_a, b_volume+served_b)
        }
        prob *= 0.25;
        memo.set(key, prob)
        return prob;
    }
     
    return dfs(N, N)
};
