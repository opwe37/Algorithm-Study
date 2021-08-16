var minWindow = function(s, t) {
    const m = s.length;
    const n = t.length;
    if (m < n) { return ""; }
    
    const tLetters = new Map();
    t.split('').forEach(char => {
        if (!tLetters.has(char)) { tLetters.set(char, 0); }
        tLetters.set(char, tLetters.get(char) + 1);
    });
    
    let ans = "";
    let lo = n, hi = m;
    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        
        const tmp = findSubstr(s, new Map(tLetters), mid);
        if (tmp == '') {
            lo = mid + 1;
        } else {
            ans = tmp;
            hi = mid - 1;
        }
    }
    return ans;
};

var findSubstr = function(s, tMap, windowSize) {
    for (let i = 0; i < windowSize; i++) {
        if (!tMap.has(s[i])) { continue; }
        tMap.set(s[i], tMap.get(s[i]) - 1 );
    }
    
    if (checkWindow(tMap)) { return s.substring(0, windowSize); }
    
    for (let i = windowSize; i < s.length; i++) {
        if (tMap.has(s[i-windowSize])) { tMap.set(s[i-windowSize], tMap.get(s[i-windowSize]) + 1); }
        if (tMap.has(s[i])) { tMap.set(s[i], tMap.get(s[i]) - 1); }
        
        if (checkWindow(tMap)) { return s.substring(i-windowSize+1, i+1); }
    }
    
    return "";
}

var checkWindow = function(tMap) {
    for (let [_, v] of tMap) {
        if (v > 0) { return false; }
    }
    return true;
}
