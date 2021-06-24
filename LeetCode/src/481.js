var magicalString = function(n) {
    if (n == 0) { return 0; }
    
    let s = '122';
    let nextIdx = 2;
    while (s.length < n) {
        const nextChar = s[s.length-1] == '1' ? '2' : '1';
        s += nextChar.repeat(Number(s[nextIdx]));
        nextIdx += 1;
    }
    
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += s[i] == '1' ? 1 : 0;
    }
    return ans;
};
