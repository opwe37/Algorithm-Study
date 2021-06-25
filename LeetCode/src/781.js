var numRabbits = function(answers) {
    let ans = 0;
    
    const N = answers.length;
    
    const map = new Map();
    for (let i = 0; i < N; i++) {
        if (!map.has(answers[i])) {
            map.set(answers[i], 0);
        }
        map.set(answers[i], map.get(answers[i]) + 1);
    }
    
    for (let [num, val] of map.entries()) {
        const q = Math.trunc(val / (num+1));
        const r = val % (num+1);
        
        ans += q * (num+1);
        ans += r == 0 ? 0 : (num+1);
    }
    
    return ans;
};
