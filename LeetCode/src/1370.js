var sortString = function(s) {
    const unique = Array.from(new Set(s.split(''))).sort();
    const char_count = new Map();
    for (let ch of s) {
        if (!char_count.has(ch)) {
            char_count.set(ch, 0);
        }
        char_count.set(ch, char_count.get(ch) + 1);
    }
    
    let result = '';
    while (result.length != s.length) {
        for (let i = 0; i < unique.length; i++) {
            if (char_count.get(unique[i]) == 0) {
                continue;
            }
            result += unique[i];
            char_count.set(unique[i], char_count.get(unique[i]) - 1);
        }
        
        for (let i = unique.length-1; i >= 0; i--) {
            if (char_count.get(unique[i]) == 0) {
                continue;
            }
            result += unique[i];
            char_count.set(unique[i], char_count.get(unique[i]) - 1);
        }
    }
    return result;
};
