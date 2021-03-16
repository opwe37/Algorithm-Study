var customSortString = function(S, T) {
    const dict = new Map();
    S.split('').forEach((char, idx) => {
        dict.set(char, idx);
    });
    
    let T_arr = T.split('');
    T_arr = T_arr.sort((a, b) => {
        if (dict.has(a) && dict.has(b)) {
            return dict.get(a) - dict.get(b);
        }
        
        if (dict.has(a)) {
            return -1;
        }
        
        if (dict.has(b)) {
            return 1;
        }
        
        return 0;
    });
    
    return T_arr.join('');
};
