var orderlyQueue = function(s, k) {
    if (k == 1) {
        let minS = s;
        for (let i = 1; i < s.length; i++) {
            s = s.slice(1) + s.slice(0, 1);
            if (minS > s) {
                minS = s;
            }
        }
        return minS;
    } else {
        const chars = s.split('');
        chars.sort();
        return chars.join('');
    }
};
