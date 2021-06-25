var numRabbits = function(answers) {
    let ans = 0;
    
    const N = answers.length;
    
    const answerCount = new Map();
    for (let i = 0; i < N; i++) {
        if (!answerCount.has(answers[i])) {
            answerCount.set(answers[i], 0);
        }
        answerCount.set(answers[i], answerCount.get(answers[i]) + 1);
    }
    
    for (let [answer, freq] of answerCount.entries()) {
        const q = Math.trunc(freq / (answer+1));
        const r = freq % (answer+1);
        
        ans += q * (answer+1);
        ans += r == 0 ? 0 : (answer+1);
    }
    
    return ans;
};
