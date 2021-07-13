var isIsomorphic = function(s, t) {
    if (s.length != t.length) { return false; }
    
    const sToT = new Map();
    const tToS = new Map();
    for (let i = 0; i < s.length; i++) {
        if (!sToT.has(s[i])) {
            if (tToS.has(t[i]) && tToS.get(t[i]) != s[i]) {
                return false;
            }
            
            sToT.set(s[i], t[i]);
            tToS.set(t[i], s[i]);
        } else {
            if (sToT.get(s[i]) != t[i]) { return false; }
        }
    }
    
    return true;
};
