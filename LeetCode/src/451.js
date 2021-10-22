var frequencySort = function(s) {
    const freqMap = new Map();
    for (let i = 0; i < s.length; i++) {
    	if (!freqMap.has(s[i])) { freqMap.set(s[i], 0); }
        freqMap.set(s[i], freqMap.get(s[i]) + 1);
    }
    
    const freqArr = Array.from(freqMap.entries());
    freqArr.sort((a, b) => b[1] - a[1]);
    
    let answer = '';
    
    for (const [key, val] of freqArr) {
    	answer += key.repeat(val);
    }
    
    return answer;
}
