var numDecodings = function(s) {
    const memo = Array(s.length).fill(null);
    
    function findSubDecoding(s, idx) {
        if (s[idx] == '0') { memo[idx] = 0; }
        if (memo[idx] != null) { return memo[idx]; }
        if (idx >= s.length) { return 1; }
        
        const selectOne = findSubDecoding(s, idx+1);
        const selectTwo = (idx < s.length-1 && Number(s.substring(idx, idx+2)) <= 26) ? findSubDecoding(s, idx+2) : 0;
        
        memo[idx] += (selectOne + selectTwo)
        
        return memo[idx];
    }
    
    findSubDecoding(s, 0);
    
    return memo[0];
};
